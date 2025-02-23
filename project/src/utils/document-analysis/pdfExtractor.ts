import * as pdfjsLib from 'pdfjs-dist';
import { DocumentAnalysisError } from './errors';

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    const maxPages = pdf.numPages;
    const textContent: string[] = [];

    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: any) => item.str)
        .join(' ');
      textContent.push(pageText);
    }

    return textContent.join('\n\n');
  } catch (error: any) {
    throw new DocumentAnalysisError(
      'Failed to extract text from PDF: ' + error.message,
      'PDF_EXTRACTION_ERROR'
    );
  }
}