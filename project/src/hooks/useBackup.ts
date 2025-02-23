import { useState, useCallback } from 'react';
import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../firebase';

interface BackupData {
  id?: string;
  userId: string;
  content: string;
  analysisResults: any[];
  timestamp: Date;
  metadata: {
    industry: string;
    department: string;
    category: string;
    riskScore: number;
  };
}

export function useBackup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveBackup = useCallback(async (data: Omit<BackupData, 'userId' | 'timestamp'>) => {
    if (!auth.currentUser) {
      throw new Error('User must be authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      const backupData: BackupData = {
        ...data,
        userId: auth.currentUser.uid,
        timestamp: new Date()
      };

      await addDoc(collection(db, 'backups'), backupData);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getLatestBackup = useCallback(async () => {
    if (!auth.currentUser) {
      throw new Error('User must be authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      const q = query(
        collection(db, 'backups'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
        limit(1)
      );

      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return null;
      }

      const backup = snapshot.docs[0].data() as BackupData;
      backup.id = snapshot.docs[0].id;
      return backup;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    saveBackup,
    getLatestBackup,
    isLoading,
    error
  };
}