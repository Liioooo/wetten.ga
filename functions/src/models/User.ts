import * as admin from 'firebase-admin';
type Timestamp = admin.firestore.Timestamp;

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
