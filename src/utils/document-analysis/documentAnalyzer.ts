import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';
import { extractTextFromPdf } from './pdfExtractor';
import { processExcelData } from './excelProcessor';
import { processTextData } from './textProcessor';
import { DocumentAnalysisError } from './errors';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface AnalysisResult {
  type: 'pdf' | 'excel' | 'text';
  data: any;
  metadata: {
    filename: string;
    pageCount?: number;
    extractedFields: string[];
    warnings: string[];
  };
}

export async function analyzeDocuments(
  files: File[],
  industry: string
): Promise<AnalysisResult[]> {
  const results: AnalysisResult[] = [];
  const startTime = Date.now();

  try {
    await Promise.all(
      files.map(async (file) => {
        const result = await analyzeDocument(file, industry);
        results.push(result);
      })
    );

    const processingTime = (Date.now() - startTime) / 1000;
    if (processingTime > 30) {
      console.warn(`Document analysis took longer than expected: ${processingTime}s`);
    }

    return results;
  } catch (error: any) {
    throw new DocumentAnalysisError(
      'Failed to analyze documents: ' + error.message,
      error.code || 'ANALYSIS_ERROR'
    );
  }
}

async function analyzeDocument(
  file: File,
  industry: string
): Promise<AnalysisResult> {
  const fileType = file.type;
  const fileName = file.name;

  try {
    if (fileType === 'application/pdf') {
      const text = await extractTextFromPdf(file);
      
      // Check if OCR is needed
      if (!text || text.trim().length === 0) {
        const worker = await createWorker();
        const { data: { text: ocrText } } = await worker.recognize(file);
        await worker.terminate();
        
        return {
          type: 'pdf',
          data: ocrText,
          metadata: {
            filename: fileName,
            extractedFields: [],
            warnings: ['OCR was required for text extraction']
          }
        };
      }

      return {
        type: 'pdf',
        data: text,
        metadata: {
          filename: fileName,
          extractedFields: [],
          warnings: []
        }
      };
    }
    
    else if (
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileType === 'application/vnd.ms-excel'
    ) {
      const data = await processExcelData(file);
      return {
        type: 'excel',
        data,
        metadata: {
          filename: fileName,
          extractedFields: Object.keys(data),
          warnings: []
        }
      };
    }
    
    else if (fileType === 'text/plain') {
      const text = await file.text();
      const processedData = await processTextData(text, industry);
      return {
        type: 'text',
        data: processedData,
        metadata: {
          filename: fileName,
          extractedFields: Object.keys(processedData),
          warnings: []
        }
      };
    }
    
    throw new DocumentAnalysisError(
      `Unsupported file type: ${fileType}`,
      'UNSUPPORTED_FILE_TYPE'
    );
  } catch (error: any) {
    throw new DocumentAnalysisError(
      `Error processing ${fileName}: ${error.message}`,
      error.code || 'PROCESSING_ERROR'
    );
  }
}