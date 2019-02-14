import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Roll} from './models/Roll';
import {Bet} from './models/Bet';

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


    const waitArr = [];
    const bets: Bet[] =
    Array.from(new Set(await afs.collection('bet').get()));
    bets.forEach(async bet =>  {
      const userPath = `users/${bet.user}`;
      const user = afs.doc();
    });
    console.log(bets);



  resp.send('updated rolls');
});
