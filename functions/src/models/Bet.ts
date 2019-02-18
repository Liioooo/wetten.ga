import * as admin from 'firebase-admin';
type DocumentReference = admin.firestore.DocumentReference;

export interface Bet {
  redAmount?: 0;
  greenAmount?: 0;
  blackAmount?: 0;
  user: DocumentReference;
}
