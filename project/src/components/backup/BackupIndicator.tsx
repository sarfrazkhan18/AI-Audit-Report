import React from 'react';
import { motion } from 'framer-motion';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

interface BackupIndicatorProps {
  status: 'saving' | 'saved' | 'error';
  error?: string;
}

export const BackupIndicator: React.FC<BackupIndicatorProps> = ({ status, error }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      {status === 'saving' && (
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <Save className="w-4 h-4 animate-pulse" />
          <span>Saving...</span>
        </div>
      )}

      {status === 'saved' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Changes saved</span>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error || 'Failed to save changes'}</span>
        </motion.div>
      )}
    </motion.div>
  );
};