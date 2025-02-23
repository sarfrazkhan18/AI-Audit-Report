import { DocumentAnalysisError } from './errors';

interface ProcessedTextData {
  sections: {
    [key: string]: string;
  };
  keyFindings: string[];
  dates: string[];
  metrics: {
    [key: string]: string | number;
  };
}

export async function processTextData(
  text: string,
  industry: string
): Promise<ProcessedTextData> {
  try {
    const sections: { [key: string]: string } = {};
    const keyFindings: string[] = [];
    const dates: string[] = [];
    const metrics: { [key: string]: string | number } = {};

    // Split text into sections based on common headers
    const sectionHeaders = [
      'Executive Summary',
      'Findings',
      'Recommendations',
      'Methodology',
      'Scope',
      'Conclusion'
    ];

    let currentSection = '';
    const lines = text.split('\n');

    lines.forEach(line => {
      // Check for section headers
      const header = sectionHeaders.find(h => 
        line.toLowerCase().includes(h.toLowerCase())
      );

      if (header) {
        currentSection = header;
        sections[header] = '';
      } else if (currentSection) {
        sections[currentSection] += line + '\n';
      }

      // Extract dates using regex
      const dateMatches = line.match(
        /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2}/g
      );
      if (dateMatches) {
        dates.push(...dateMatches);
      }

      // Extract metrics based on industry
      if (industry === 'Finance') {
        const amountMatch = line.match(/\$\s*[\d,]+(\.\d{2})?/g);
        if (amountMatch) {
          metrics['Financial Amounts'] = amountMatch.map(m => 
            parseFloat(m.replace(/[$,]/g, ''))
          );
        }
      } else if (industry === 'Healthcare') {
        const percentageMatch = line.match(/\d+(\.\d+)?%/g);
        if (percentageMatch) {
          metrics['Percentages'] = percentageMatch;
        }
      }

      // Identify key findings (lines starting with specific patterns)
      if (
        line.match(/^(Finding|Issue|Observation|Risk):/i) ||
        line.match(/^\d+\.\s+[A-Z]/)
      ) {
        keyFindings.push(line.trim());
      }
    });

    return {
      sections,
      keyFindings,
      dates,
      metrics
    };
  } catch (error: any) {
    throw new DocumentAnalysisError(
      'Failed to process text data: ' + error.message,
      'TEXT_PROCESSING_ERROR'
    );
  }
}