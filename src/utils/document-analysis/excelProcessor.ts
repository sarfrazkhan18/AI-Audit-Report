import * as XLSX from 'xlsx';
import { DocumentAnalysisError } from './errors';

interface ExcelData {
  [sheet: string]: {
    headers: string[];
    rows: any[][];
    summary?: {
      totals: { [column: string]: number };
      averages: { [column: string]: number };
    };
  };
}

export async function processExcelData(file: File): Promise<ExcelData> {
  try {
    const data: ExcelData = {};
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });

    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length === 0) {
        return; // Skip empty sheets
      }

      const headers = jsonData[0] as string[];
      const rows = jsonData.slice(1) as any[][];

      // Calculate summary statistics for numeric columns
      const summary = calculateSummaryStatistics(headers, rows);

      data[sheetName] = {
        headers,
        rows,
        summary
      };
    });

    return data;
  } catch (error: any) {
    throw new DocumentAnalysisError(
      'Failed to process Excel file: ' + error.message,
      'EXCEL_PROCESSING_ERROR'
    );
  }
}

function calculateSummaryStatistics(headers: string[], rows: any[][]) {
  const totals: { [column: string]: number } = {};
  const averages: { [column: string]: number } = {};

  headers.forEach((header, index) => {
    const values = rows.map(row => row[index]).filter(val => !isNaN(val));
    
    if (values.length > 0) {
      totals[header] = values.reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
      averages[header] = totals[header] / values.length;
    }
  });

  return { totals, averages };
}