import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Roll} from './models/Roll';
import {Bet} from './models/Bet';
type QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot;

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

  const betsRed: QueryDocumentSnapshot[] = (await db.collection('bets')
      .where("redAmount", ">", 0)
      .get()
  ).docs;
  const betsGreen: QueryDocumentSnapshot[] = (await db.collection('bets')
      .where("greenAmount", ">", 0)
      .get()
  ).docs;
  const betsBlack: QueryDocumentSnapshot[] = (await db.collection('bets')
      .where("blackAmount", ">", 0)
      .get()
  ).docs;

  const tempBets = [...betsRed, ...betsGreen, ...betsBlack];
  const bets: QueryDocumentSnapshot[] = [];
  for (let i = 0; i < tempBets.length; i++) {
    console.log(tempBets[i].data());
    let included = false;
    for (let j = 0; j < bets.length; j++) {
      if(tempBets[i].isEqual(bets[j])) {
        included = true;
        break;
      }
    }
    if(!included) {
      bets.push(tempBets[i]);
    }
  }
    bets.forEach(bet => {
      console.log(bet.data());
      const betData = bet.data() as Bet;
      const {redAmount = 0, greenAmount = 0, blackAmount = 0} = betData;
      db.runTransaction(transaction => transaction.get(betData.user)
        .then(userDoc => {
          if (!userDoc.exists) { return; }
          console.log("doc exists")

          let amount = 0;
          if (newRoll.rolledNumber === 0) {
            amount = (greenAmount * 15) - blackAmount - redAmount;
          } else if (newRoll.rolledNumber >= 1 && newRoll.rolledNumber <= 7) {
            amount = redAmount - greenAmount - blackAmount;
          } else if (newRoll.rolledNumber >= 8 && newRoll.rolledNumber <= 14) {
            amount = blackAmount - redAmount - greenAmount;
          }

          const data = userDoc.data();
          if (data === undefined) {return;}

          amount += data.amount;
          if(amount === 0) {
            transaction.update(betData.user, { amount });
          }
          transaction.update(bet.ref, {redAmount: 0, blackAmount: 0, greenAmount: 0});
        }))
        .catch(console.error);

    });


  resp.send('updated rolls');
});
