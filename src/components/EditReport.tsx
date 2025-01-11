import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from './ui/button';
import { Save, Download, FileType, FileSpreadsheet, Check, AlertCircle, ClipboardList } from 'lucide-react';
import { downloadDocx, downloadPptx, downloadExcel } from '../utils/fileDownloader';

const EditReport: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<any>(null);
  const [editedContent, setEditedContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [showDownloadGuide, setShowDownloadGuide] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'reports', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setReport(docSnap.data());
            setEditedContent(docSnap.data().content);
          } else {
            setError('Report not found');
          }
        } catch (error) {
          setError('Failed to load report');
          console.error('Error fetching report:', error);
        }
      }
    };

    fetchReport();
  }, [id]);

  const handleSave = async () => {
    if (!id) return;
    
    setIsSaving(true);
    setSaveStatus('saving');
    setError(null);
    setShowDownloadGuide(false);

    try {
      const docRef = doc(db, 'reports', id);
      await updateDoc(docRef, {
        content: editedContent,
        updatedAt: new Date()
      });
      setSaveStatus('saved');
      setShowDownloadGuide(true);
      setTimeout(() => {
        setSaveStatus('idle');
        setShowDownloadGuide(false);
      }, 5000);
    } catch (error) {
      console.error('Error saving report:', error);
      setError('Failed to save changes');
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async (format: 'docx' | 'pptx' | 'excel') => {
    try {
      switch (format) {
        case 'docx':
          await downloadDocx(editedContent);
          break;
        case 'pptx':
          await downloadPptx(editedContent);
          break;
        case 'excel':
          await downloadExcel(editedContent);
          break;
      }
    } catch (error) {
      setError(`Failed to download ${format.toUpperCase()} file`);
      console.error('Error downloading file:', error);
    }
  };

  if (!report) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Report: {report.title}</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate('/reports')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ClipboardList className="h-4 w-4" />
            All Reports
          </Button>
          <Button
            onClick={() => handleDownload('docx')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Word
          </Button>
          <Button
            onClick={() => handleDownload('pptx')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileType className="h-4 w-4" />
            PowerPoint
          </Button>
          <Button
            onClick={() => handleDownload('excel')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Excel
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full h-[60vh] p-4 border rounded-md mb-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {saveStatus === 'saved' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
        </Button>

        {saveStatus === 'saved' && (
          <div className="text-green-600 flex items-center gap-2">
            <Check className="h-4 w-4" />
            Changes saved successfully
          </div>
        )}

        {error && (
          <div className="text-red-500 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </div>

      {showDownloadGuide && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded">
          <p className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Your changes have been saved. You can now download the updated report in your preferred format using the buttons above.
          </p>
        </div>
      )}
    </div>
  );
};

export default EditReport;