import * as admin from 'firebase-admin';
type DocumentReference = admin.firestore.DocumentReference;

export interface Bet {
  redAmount?: number;
  greenAmount?: number;
  blackAmount?: number;
  user: DocumentReference;
}

export class BetObj implements Bet {
  blackAmount = 0;
  greenAmount = 0;
  redAmount = 0;
  constructor(public user: DocumentReference) {
  }
}
