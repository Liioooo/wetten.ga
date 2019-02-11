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
    await ref.push(newRoll);

    const snapshot = await ref.limitToLast(10).once('value');
    ref.set(snapshot.val());
    resp.send('updated rolls');
});
