import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

export interface Roll {
    rolledNumber: number;
    timestamp: Timestamp;
    id?: string;
}
