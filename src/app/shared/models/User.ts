import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

export interface User {
  uid: string;
  photoURL: string;
  displayName: string;
  email: string;
  registeredSince: Timestamp;
  amount?: number;
  family_name?: string;
  given_name?: string;
  gender?: string;
  phoneNumber?: string;
}
