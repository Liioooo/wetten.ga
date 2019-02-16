import {BetType} from './enums';
import * as admin from 'firebase-admin';
type DocumentReference = admin.firestore.DocumentReference;

export interface Bet {
  amount: number;
  betType: BetType;
  user: DocumentReference;
}
