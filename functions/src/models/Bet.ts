import {BetType} from './enums';
import {DocumentReference} from '@angular/fire/firestore';

export interface Bet {
  amount: number;
  betType: BetType;
  user: DocumentReference;
}
