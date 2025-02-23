export interface DocumentMetadata {
  filename: string;
  fileType: string;
  size: number;
  lastModified: Date;
  pageCount?: number;
  extractedFields: string[];
  warnings: string[];
}

export interface AnalysisMetrics {
  processingTime: number;
  confidenceScore?: number;
  extractionQuality?: 'high' | 'medium' | 'low';
  warningCount: number;
  errorCount: number;
}

export interface TextAnalysisResult {
  sections: {
    [key: string]: string;
  };
  keyFindings: string[];
  dates: string[];
  metrics: {
    [key: string]: string | number;
  };
}

export interface ExcelAnalysisResult {
  sheets: {
    [sheetName: string]: {
      headers: string[];
      rows: any[][];
      summary: {
        totals: { [column: string]: number };
        averages: { [column: string]: number };
      };
    };
  };
  insights: {
    anomalies: string[];
    trends: string[];
    recommendations: string[];
  };
}

export interface PdfAnalysisResult {
  text: string;
  structure: {
    sections: string[];
    tables: any[][];
    images: number;
  };
  metadata: {
    title?: string;
    author?: string;
    creationDate?: Date;
    pageCount: number;
  };
}

export type AnalysisResult = {
  type: 'pdf' | 'excel' | 'text';
  data: PdfAnalysisResult | ExcelAnalysisResult | TextAnalysisResult;
  metadata: DocumentMetadata;
  metrics: AnalysisMetrics;
};