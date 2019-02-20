import * as admin from 'firebase-admin';
type DocumentReference = admin.firestore.DocumentReference;

export interface Bet {
  redAmount?: number;
  greenAmount?: number;
  blackAmount?: number;
  user: DocumentReference;
}
