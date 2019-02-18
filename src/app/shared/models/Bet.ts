import {DocumentReference} from '@angular/fire/firestore';
import {User} from './User';

export interface Bet {
  user: DocumentReference | User;
  redAmount?: number;
  greenAmount?: number;
  blackAmount?: number;
}
