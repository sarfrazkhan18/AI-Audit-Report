import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ReportPreviewProps {
  content: string;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ content }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Report</CardTitle>
      </CardHeader>
      <CardContent>
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