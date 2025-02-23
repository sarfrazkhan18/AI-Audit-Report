import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download, FileText, FileSpreadsheet, FileImage, Share2 } from 'lucide-react';
import { downloadDocx, downloadPptx, downloadExcel } from '../utils/fileDownloader';
import { useToast } from './ui/use-toast';
import { ShareReport } from './report/ShareReport';

interface ReportPreviewProps {
  content: string;
  reportId?: string;
  title?: string;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ content, reportId, title }) => {
  const { toast } = useToast();

  const handleDownload = async (format: 'docx' | 'pptx' | 'excel') => {
    try {
      let fileName = `audit_report_${new Date().toISOString().split('T')[0]}`;
      
      switch (format) {
        case 'docx':
          await downloadDocx(content);
          fileName += '.docx';
          break;
        case 'pptx':
          await downloadPptx(content);
          fileName += '.pptx';
          break;
        case 'excel':
          await downloadExcel(content);
          fileName += '.xlsx';
          break;
      }

      toast({
        title: "Download Started",
        description: `Your report will be downloaded as ${fileName}`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your report. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Generated Report</CardTitle>
        {reportId && title && (
          <ShareReport reportId={reportId} reportTitle={title} />
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant="outline"
            onClick={() => handleDownload('docx')}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Download as Word
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDownload('pptx')}
            className="flex items-center gap-2"
          >
            <FileImage className="w-4 h-4" />
            Download as PowerPoint
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDownload('excel')}
            className="flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Download as Excel
          </Button>
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          {content.split('\n').map((paragraph, index) => (
            paragraph.trim() ? (
              <p key={index} className="mb-4 whitespace-pre-wrap">
                {paragraph}
              </p>
            ) : null
          ))}
        </div>
      </CardContent>
    </Card>
  );
};