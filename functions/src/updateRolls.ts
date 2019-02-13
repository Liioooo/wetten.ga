import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Roll} from './models/Roll';

const afs = admin.firestore();

export const updateRolls = functions.https.onRequest(async (req, resp) => {
    const ref = afs.collection('rolls');
    const newRoll: Roll = {
      rolledNumber: Math.floor(Math.random() * 15),
      timestamp: admin.firestore.Timestamp.now()
    };

    const snapshot = await ref
      .orderBy('timestamp')
      .limit(1)
      .get();
    if (!snapshot.empty) {
      const querySnap = snapshot.docs[0];
      await querySnap.ref.delete();
    }

    await ref.add(newRoll);

  resp.send('updated rolls');
});
