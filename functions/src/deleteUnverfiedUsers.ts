import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const deleteUnverfiedUsers = functions.https
    .onRequest(async (req, resp) => {
        const users = await admin.auth().listUsers();
        users.users
            .filter(user => user.providerData[0].providerId === 'password' && !user.emailVerified)
            .forEach(async user => {
               await admin.auth().deleteUser(user.uid);
               db.doc(`/users/${user.uid}`).delete();
            });

        resp.send('deleted users');
    });