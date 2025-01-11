import { getFirestore } from 'firebase/firestore';
import { app } from './config';

// Initialize Firestore
const db = getFirestore(app);

export { db };