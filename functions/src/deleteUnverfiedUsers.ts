import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const deleteUnverifiedUsers = functions.https
    .onRequest(async (req, resp) => {
        const users = await admin.auth().listUsers();
        users.users
            .filter(user => user.providerData[0].providerId === 'password' && !user.emailVerified)
            .forEach(async user => {
                const document = db.doc(`/users/${user.uid}`);
                const registeredSince = (await document.get()).get('registeredSince');
                if (admin.firestore.Timestamp.now().seconds - registeredSince.seconds >= 180) {
                    await admin.auth().deleteUser(user.uid);
                    document.delete();
                }
            });

        resp.send('deleted users');
    });