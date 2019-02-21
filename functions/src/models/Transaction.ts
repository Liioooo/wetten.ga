import * as admin from 'firebase-admin';
type DocumentReference = admin.firestore.DocumentReference;

export interface Transaction {
  amount: number;
  to: DocumentReference;
  from: DocumentReference;
}
