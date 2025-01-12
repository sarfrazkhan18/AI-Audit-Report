import { getFirestore } from 'firebase/firestore';
import { app } from './config';

// Initialize Firestore
const db = getFirestore(app);

export { db };

export const reportsCollection = {
  add: async (report: Report) => {
    return await db.collection('reports').add({
      ...report,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },
  
  get: async (userId: string) => {
    return await db.collection('reports')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
  }
};