import {DocumentReference} from '@angular/fire/firestore';

export interface Bet {
  user: DocumentReference;
  [propName: string]: number;
}
