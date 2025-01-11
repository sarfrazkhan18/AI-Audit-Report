import { GoogleGenerativeAI } from '@google/generative-ai';
import { ReportGenerationError, ReportErrorCodes } from './errors/reportErrors';
import { validateApiKey } from './validation/apiKeyValidator';
import { buildAuditPrompt } from './prompts/auditPromptBuilder';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

interface ReportData {
  industry: string;
  department: string;
  category: string;
  objectives: string;
  scope: string;
  customInstructions?: string;
}

export async function generateReport(data: ReportData): Promise<string> {
  try {
    // Validate inputs
    if (!data.industry || !data.department || !data.category || !data.objectives || !data.scope) {
      throw new ReportGenerationError(
        'All required fields must be filled out.',
        ReportErrorCodes.VALIDATION_ERROR
      );
    }

    // Validate API key
    validateApiKey(API_KEY);
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = buildAuditPrompt(data);

    // Generation config for better formatting
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      stopSequences: ["```", "###", "```json", "```xml"],
    };

    const safetySettings = [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ];

    // Generate content with retry mechanism
    let attempts = 0;
    const maxAttempts = 3;
    let lastError: Error | null = null;

    while (attempts < maxAttempts) {
      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig,
          safetySettings,
        });

        const response = await result.response;
        let text = response.text();
        
        if (!text || text.trim().length === 0) {
          throw new ReportGenerationError(
            'Generated report is empty.',
            ReportErrorCodes.EMPTY_RESPONSE
          );
        }

        // Clean up any remaining special characters or markdown
        text = text
          .replace(/\*\*/g, '')
          .replace(/\*/g, '')
          .replace(/`/g, '')
          .replace(/\[|\]/g, '')
          .replace(/#{1,6}\s/g, '')
          .replace(/\n{3,}/g, '\n\n')
          .trim();

        // Basic content validation
        if (!text.includes('EXECUTIVE SUMMARY') || !text.includes('CONCLUSIONS')) {
          throw new ReportGenerationError(
            'Generated report is incomplete.',
            ReportErrorCodes.INVALID_CONTENT
          );
        }

        return text;
      } catch (error: any) {
        lastError = error;
        attempts++;
        
        // Wait before retrying (exponential backoff)
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
        }
      }
    }

    // If all attempts failed, throw the last error
    if (lastError) {
      throw lastError;
    }

    throw new ReportGenerationError(
      'Failed to generate report after multiple attempts.',
      ReportErrorCodes.GENERATION_FAILED
    );
    
  } catch (error: any) {
    console.error('Error in report generation:', error);
    
    if (error instanceof ReportGenerationError) {
      throw error;
    }
    
    if (!API_KEY) {
      throw new ReportGenerationError(
        'API key is missing. Please add your Gemini API key to the .env file.',
        ReportErrorCodes.API_KEY_MISSING
      );
    }
    
    if (error.message?.includes('API key')) {
      throw new ReportGenerationError(
        'Invalid API key. Please check your Gemini API key configuration.',
        ReportErrorCodes.API_KEY_INVALID
      );
    }
    
    if (error.message?.includes('network')) {
      throw new ReportGenerationError(
        'Network error. Please check your internet connection and try again.',
        ReportErrorCodes.NETWORK_ERROR
      );
    }
    
    throw new ReportGenerationError(
      'An unexpected error occurred while generating the report. Please try again.',
      ReportErrorCodes.GENERATION_FAILED
    );
  }
}