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

    const newRollId = await ref.push().key || '';

    const rolls: object = snapshot.val();
    rolls[newRollId] = newRoll;

    await ref.set(rolls);

    resp.send('updated rolls');
});
