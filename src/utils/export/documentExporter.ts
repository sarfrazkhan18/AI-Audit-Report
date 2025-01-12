import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph } from 'docx';

interface ExportOptions {
  format: 'pdf' | 'docx' | 'pptx';
  title: string;
  content: string;
}

export async function exportDocument(options: ExportOptions) {
  switch (options.format) {
    case 'pdf':
      return exportToPDF(options);
    case 'docx':
      return exportToWord(options);
    case 'pptx':
      return exportToPowerPoint(options);
    default:
      throw new Error('Unsupported format');
  }
}

async function exportToPDF({ title, content }: ExportOptions) {
  const doc = new jsPDF();
  doc.text(title, 20, 20);
  doc.text(content, 20, 30);
  return doc.save(`${title}.pdf`);
}

async function exportToWord({ title, content }: ExportOptions) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: title,
          heading: 'Heading1'
        }),
        new Paragraph({
          text: content
        })
      ]
    }]
  });

  return Packer.toBlob(doc).then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.docx`;
    a.click();
  });
} 