import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {BetType} from './models/enums';
import {Bet} from './models/Bet';
type DocumentSnapshot = admin.firestore.DocumentSnapshot;

// const db = admin.firestore();
export const removeMoney = functions.firestore
  .document('bets/{userId}')
  .onWrite(async (change: functions.Change<DocumentSnapshot>, context) => {
    const beforeSnapshot = change.before;
    const afterSnapshot = change.after;
    if(beforeSnapshot) {
      const before: Bet = beforeSnapshot.data() as Bet;
      const after: Bet = afterSnapshot.data() as Bet;
      if (after && before) {
        if (before.redAmount !== after.redAmount) {
          await transform(before, after, BetType.red);
        } else if (before.blackAmount !== after.blackAmount) {
          await transform(before, after, BetType.black);
        } else if (before.greenAmount !== after.greenAmount) {
          await transform(before, after, BetType.green);
        }
        return "done";
      }
    }
    return "It was a delete, no action taken";
  });


async function transform(before, after, type: BetType = BetType.black) {
  if(before && after) {
    const amountBefore = before[type] ? before[type] : 0;
    const diff = after[type] - amountBefore;

    const user = (await after.user.get()).data();
    await after.user.update({amount: user.amount - diff})

    /*
    db.runTransaction(transaction => transaction.get(after.user as DocumentReference)
      .then(userDoc => {
        const exists = userDoc.exists;
        if (!exists) { return; }
        const userData = userDoc.data();
        if(!userData) { return; }
        transaction.update(userDoc.ref, {amount: userData.amount - diff});
      }))
      .catch(console.error);
      */
  }


}
