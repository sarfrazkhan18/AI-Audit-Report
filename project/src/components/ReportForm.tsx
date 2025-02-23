import React, { useState } from 'react';
import { useBackup } from '../hooks/useBackup';
import { BackupIndicator } from './backup/BackupIndicator';
import { BackupHistory } from './backup/BackupHistory';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ReportFormInputs } from './ReportFormInputs';
import { ReportPreview } from './ReportPreview';
import { ProgressBar } from './ProgressBar';
import RiskMatrix from './risk/RiskMatrix';
import { generateReport } from '../utils/reportGenerator';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface FormInputs {
  industry: string;
  department: string;
  category: string;
  objectives: string;
  scope: string;
  customInstructions?: string;
}

const ReportForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [riskScore, setRiskScore] = useState<number>(0);
  const [backupStatus, setBackupStatus] = useState<'saving' | 'saved' | 'error'>('saved');
  const [analyzedData, setAnalyzedData] = useState<any>(null);
  const navigate = useNavigate();
  const { saveBackup } = useBackup();
  
  const selectedIndustry = watch('industry');

  const handleRiskScoreChange = (score: number) => {
    setRiskScore(score);
  };

  const handleFormSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 1000);

      const content = await generateReport({
        ...data,
        riskScore
      });

      clearInterval(progressInterval);
      setProgress(100);

      // Save to Firestore
      if (auth.currentUser) {
        await addDoc(collection(db, 'reports'), {
          userId: auth.currentUser.uid,
          title: `${data.industry} - ${data.department} Audit Report`,
          content,
          industry: data.industry,
          department: data.department,
          category: data.category,
          riskScore,
          createdAt: new Date()
        });

        // Save backup
        try {
          await saveBackup({
            content,
            analysisResults: analyzedData || [],
            metadata: {
              industry: data.industry,
              department: data.department,
              category: data.category,
              riskScore
            }
          });
          setBackupStatus('saved');
        } catch (err) {
          console.error('Backup error:', err);
          setBackupStatus('error');
        }
      }

      setReportContent(content);
    } catch (err: any) {
      setError(err.message || 'Failed to generate report');
      console.error('Report generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Create New Report</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {!reportContent ? (
          <Card className="p-6">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              <ReportFormInputs 
                register={register}
                errors={errors}
                selectedIndustry={selectedIndustry}
              />

              <div className="my-8">
                <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
                <RiskMatrix onScoreChange={handleRiskScoreChange} />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="min-w-[150px]"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </div>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>

              {isLoading && <ProgressBar progress={progress} />}
            </form>
          </Card>
        ) : (
          <div className="space-y-6">
            <ReportPreview content={reportContent} />
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setReportContent(null)}
              >
                Generate Another
              </Button>
              <Button
                onClick={() => navigate('/reports')}
              >
                View All Reports
              </Button>
            </div>
          </div>
        )}

        <BackupIndicator status={backupStatus} error={error} />

        {!reportContent && (
          <div className="mt-8">
            <BackupHistory
              onRestore={(backup) => {
                setReportContent(backup.content);
                if (backup.analysisResults) {
                  setAnalyzedData(backup.analysisResults);
                }
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ReportForm;