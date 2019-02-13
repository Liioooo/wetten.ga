import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;

export interface Roll {
    rolledNumber: number;
    timestamp: Timestamp;
}
