import { Document, Packer, Paragraph, HeadingLevel, TextRun } from 'docx';
import pptxgen from 'pptxgenjs';
import * as XLSX from 'xlsx';

export async function downloadDocx(content: string) {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: content.split('\n').map(line => {
          if (line.trim() === '') {
            return new Paragraph({
              children: [new TextRun('')],
              spacing: { after: 200 }
            });
          }
          
          if (line.match(/^\d+\./)) {
            return new Paragraph({
              text: line,
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 240, after: 120 }
            });
          } else if (line.match(/^\d+\.\d+/)) {
            return new Paragraph({
              text: line,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 240, after: 120 }
            });
          } else {
            return new Paragraph({
              children: [new TextRun(line)],
              spacing: { before: 120, after: 120 }
            });
          }
        }),
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit_report.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating Word document:', error);
    throw new Error('Failed to generate Word document. Please try again.');
  }
}

export async function downloadPptx(content: string) {
  try {
    const pres = new pptxgen();
    const sections = content.split('\n\n');
    let currentSlide = pres.addSlide();
    let yPosition = 0.5;

    sections.forEach((section, index) => {
      const lines = section.split('\n').filter(line => line.trim());
      
      lines.forEach((line, lineIndex) => {
        if (yPosition > 5) {
          currentSlide = pres.addSlide();
          yPosition = 0.5;
        }

        if (line.match(/^\d+\./)) {
          currentSlide.addText(line, {
            x: 0.5,
            y: yPosition,
            w: '95%',
            fontSize: 24,
            bold: true,
            color: '363636'
          });
          yPosition += 0.8;
        } else if (line.match(/^\d+\.\d+/)) {
          currentSlide.addText(line, {
            x: 0.5,
            y: yPosition,
            w: '95%',
            fontSize: 20,
            bold: true,
            color: '363636'
          });
          yPosition += 0.6;
        } else {
          currentSlide.addText(line, {
            x: 0.5,
            y: yPosition,
            w: '95%',
            fontSize: 16,
            color: '363636'
          });
          yPosition += 0.4;
        }
      });

      if (index < sections.length - 1) {
        currentSlide = pres.addSlide();
        yPosition = 0.5;
      }
    });

    await pres.writeFile({ fileName: 'audit_report.pptx' });
  } catch (error) {
    console.error('Error generating PowerPoint presentation:', error);
    throw new Error('Failed to generate PowerPoint presentation. Please try again.');
  }
}

export async function downloadExcel(content: string) {
  try {
    const sections = content.split('\n\n');
    const workbook = XLSX.utils.book_new();
    
    // Create worksheet data
    const wsData = sections.map(section => {
      const lines = section.split('\n').filter(line => line.trim());
      return lines.map(line => [line.trim()]);
    }).flat();

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, ws, 'Audit Report');
    
    // Generate Excel file
    XLSX.writeFile(workbook, 'audit_report.xlsx');
  } catch (error) {
    console.error('Error generating Excel file:', error);
    throw new Error('Failed to generate Excel file. Please try again.');
  }
}