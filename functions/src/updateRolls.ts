import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Roll} from './models/Roll';
import {Bet} from './models/Bet';

const db = admin.firestore();

export const updateRolls = functions.https.onRequest(async (req, resp) => {



    const ref = db.collection('rolls');
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

    const bets: Bet[] = (await db.collection('bets')
        .get()
    ).docs.map(doc => doc.data()) as Bet[];

    bets.forEach(bet => {
      const {redAmount = 0, greenAmount = 0, blackAmount = 0} = bet;
      db.runTransaction(transaction => transaction.get(bet.user)
        .then(userDoc => {
          if (!userDoc.exists) { return; }

          let amount = 0;
          if (newRoll.rolledNumber === 0) {
            amount = greenAmount * 15;
          } else if (newRoll.rolledNumber >= 1 && newRoll.rolledNumber <= 7) {
            amount = redAmount * 2;
          } else if (newRoll.rolledNumber >= 8 && newRoll.rolledNumber <= 14) {
            amount = blackAmount * 2;
          }

          if (amount === 0) { return; }

          const data = userDoc.data();
          if (data === undefined) {return;}

          amount += data.amount;
          transaction.update(bet.user, { amount });
        }))
        .catch(console.error);
    });


  resp.send('updated rolls');
});
