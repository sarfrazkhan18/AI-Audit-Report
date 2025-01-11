import { db, auth } from '../../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

interface CustomIndustry {
  name: string;
  departments: string[];
  auditAreas: string[];
}

export const addCustomIndustry = async (industry: CustomIndustry) => {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated');
  }

  await addDoc(collection(db, 'customIndustries'), {
    ...industry,
    userId: auth.currentUser.uid,
    createdAt: new Date()
  });
};

export const getCustomIndustries = async () => {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated');
  }

  const q = query(
    collection(db, 'customIndustries'),
    where('userId', '==', auth.currentUser.uid)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};