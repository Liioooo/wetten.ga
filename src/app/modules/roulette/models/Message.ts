import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;
import {DocumentReference} from '@angular/fire/firestore';

export interface Message {
    id?: string;
    message: string;
    timestamp: Timestamp;
    user: DocumentReference;
    wasSentByLoggedInUser?: boolean;
}
