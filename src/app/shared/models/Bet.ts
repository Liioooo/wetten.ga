import {DocumentReference} from '@angular/fire/firestore';

export interface Bet {
  user: DocumentReference;
  redAmount?: number;
  greenAmount?: number;
  blackAmount?: number;
}
