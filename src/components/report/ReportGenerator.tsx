import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, FileSpreadsheet, FileImage } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { downloadDocx, downloadPptx, downloadExcel } from '../../utils/fileDownloader';
import { AnalysisResult } from '../../utils/document-analysis/types';

interface ReportGeneratorProps {
  analysisResults: AnalysisResult[];
  industry: string;
  department: string;
  category: string;
  objectives: string;
  scope: string;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  analysisResults,
  industry,
  department,
  category,
  objectives,
  scope
}) => {
  const { toast } = useToast();

  const generateReportContent = () => {
    let content = '';

    // Add title and metadata
    content += `Internal Audit Report\n`;
    content += `${industry} - ${department}\n`;
    content += `Date: ${new Date().toLocaleDateString()}\n\n`;

    // Executive Summary
    content += `1. EXECUTIVE SUMMARY\n\n`;
    content += `1.1 Audit Overview\n`;
    content += `This audit was conducted to assess ${category} within the ${department} department of our ${industry} operations.\n\n`;

    // Add objectives and scope
    content += `1.2 Objectives\n${objectives}\n\n`;
    content += `1.3 Scope\n${scope}\n\n`;

    // Key Findings from document analysis
    content += `2. KEY FINDINGS\n\n`;
    analysisResults.forEach((result, index) => {
      if (result.type === 'text') {
        const textData = result.data as any;
        if (textData.keyFindings?.length > 0) {
          content += `2.${index + 1} Findings from ${result.metadata.filename}\n`;
          textData.keyFindings.forEach((finding: string, i: number) => {
            content += `- ${finding}\n`;
          });
          content += '\n';
        }
      }
    });

    // Metrics and Analysis
    content += `3. DETAILED ANALYSIS\n\n`;
    analysisResults.forEach((result, index) => {
      content += `3.${index + 1} Analysis of ${result.metadata.filename}\n`;
      
      if (result.type === 'excel') {
        const excelData = result.data as any;
        Object.entries(excelData.sheets).forEach(([sheetName, data]: [string, any]) => {
          content += `Sheet: ${sheetName}\n`;
          if (data.summary) {
            content += 'Summary Statistics:\n';
            Object.entries(data.summary.averages).forEach(([col, val]) => {
              content += `Average ${col}: ${val}\n`;
            });
          }
          content += '\n';
        });
      }

      if (result.metrics) {
        content += `Processing Metrics:\n`;
        content += `- Processing Time: ${result.metrics.processingTime.toFixed(2)}s\n`;
        if (result.metrics.confidenceScore) {
          content += `- Confidence Score: ${(result.metrics.confidenceScore * 100).toFixed(0)}%\n`;
        }
        content += '\n';
      }
    });

    // Recommendations
    content += `4. RECOMMENDATIONS\n\n`;
    content += `Based on the analysis of the provided documents and identified findings, we recommend:\n\n`;
    analysisResults.forEach(result => {
      if (result.type === 'text') {
        const textData = result.data as any;
        if (textData.recommendations) {
          textData.recommendations.forEach((rec: string) => {
            content += `- ${rec}\n`;
          });
        }
      }
    });

    return content;
  };

  const handleDownload = async (format: 'docx' | 'pptx' | 'excel') => {
    try {
      const content = generateReportContent();
      const fileName = `audit_report_${department}_${new Date().toISOString().split('T')[0]}`;

      switch (format) {
        case 'docx':
          await downloadDocx(content);
          break;
        case 'pptx':
          await downloadPptx(content);
          break;
        case 'excel':
          await downloadExcel(content);
          break;
      }

      toast({
        title: "Report Generated",
        description: `Your report has been downloaded as ${fileName}.${format}`
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Generate Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Generate a comprehensive audit report based on the analyzed documents and provided information.
          </p>

          <div className="flex flex-wrap gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => handleDownload('docx')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Download as Word
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => handleDownload('pptx')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileImage className="w-4 h-4" />
                Download as PowerPoint
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => handleDownload('excel')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Download as Excel
              </Button>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};