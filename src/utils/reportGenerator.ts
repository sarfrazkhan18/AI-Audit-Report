import { GoogleGenerativeAI } from '@google/generative-ai';

interface ReportConfig {
  industry: string;
  department: string;
  auditArea: string;
  riskScore: number;
  scope: string;
  customInstructions?: string;
}

export async function generateReport(config: ReportConfig) {
  const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = buildAuditPrompt(config);
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Report generation error:', error);
    throw new Error('Failed to generate report');
  }
}

function buildAuditPrompt(config: ReportConfig): string {
  // Build a detailed prompt based on industry, department, and risk level
  return `Generate a detailed internal audit report for ${config.industry} industry, 
  focusing on the ${config.department} department. 
  Risk Level: ${config.riskScore}/10
  Scope: ${config.scope}
  
  Include:
  1. Executive Summary
  2. Audit Objectives
  3. Methodology
  4. Findings and Observations
  5. Risk Assessment
  6. Recommendations
  7. Action Plan
  
  ${config.customInstructions || ''}`;
}