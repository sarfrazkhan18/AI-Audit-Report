import React from 'react';
import { motion } from 'framer-motion';
import { History, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useBackup } from '../../hooks/useBackup';

interface BackupHistoryProps {
  onRestore: (backup: any) => void;
}

export const BackupHistory: React.FC<BackupHistoryProps> = ({ onRestore }) => {
  const { getLatestBackup, isLoading, error } = useBackup();
  const [backup, setBackup] = React.useState<any>(null);

  React.useEffect(() => {
    const loadBackup = async () => {
      try {
        const latestBackup = await getLatestBackup();
        setBackup(latestBackup);
      } catch (err) {
        console.error('Failed to load backup:', err);
      }
    };

    loadBackup();
  }, [getLatestBackup]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive p-4">
        Failed to load backup history: {error}
      </div>
    );
  }

  if (!backup) {
    return (
      <div className="text-muted-foreground p-4">
        No backup history available
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Latest Backup
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-sm text-muted-foreground">
            Last saved: {new Date(backup.timestamp.toDate()).toLocaleString()}
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Report Details</h4>
            <div className="text-sm">
              <p>Industry: {backup.metadata.industry}</p>
              <p>Department: {backup.metadata.department}</p>
              <p>Category: {backup.metadata.category}</p>
              <p>Risk Score: {backup.metadata.riskScore}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRestore(backup)}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const blob = new Blob([backup.content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `backup_${new Date(backup.timestamp.toDate()).toISOString()}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};