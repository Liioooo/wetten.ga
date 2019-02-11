import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Roll} from './models/Roll';

admin.initializeApp();
const database = admin.database();

export const updateRolls = functions.https.onRequest(async (req, resp) => {
    const ref = database.ref('rolls');

    const newRoll: Roll = {
      rolledNumber: Math.floor(Math.random() * 15),
      timestamp: new Date(Date.now()).toISOString()
    };

    const snapshot = await ref.limitToLast(9).once('value');
    await ref.transaction(() => {
        ref.set(snapshot.val());
        ref.push(newRoll);
    });
    resp.send('updated rolls');
});
