import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Bet} from './models/Bet';
import {BetType} from './models/enums';

const db = admin.firestore();

export const removeMoney = functions.firestore
  .document('users/{userId}')
  .onWrite(async (change, context) => {
    if(change.after) {
      const before = change.before;
      const after = change.after;
      if (before.redAmount !== after.redAmount) {
        transform(before, after, BetType.red);
      } else if (before.blackAmount !== after.blackAmount) {
        transform(before, after, BetType.black);
      } else if (before.greenAmount !== after.greenAmount) {
        transform(before, after, BetType.green);
      }
      return "done";
    }
    return "It was a delete, no action taken";
  });


function transform(before, after, type: BetType) {
  const amountBefore = before[type] ? before[type] : 0;
  const diff = after[type] - amountBefore;
  db.runTransaction(transaction => transaction.get(after.user)
    .then(userDoc => {
      if (!userDoc.exists) { return; }
      const userData = userDoc.data();
      if(!userData.amount) { return; }
      transaction.update(userDoc.ref, {amount: userData.amount - diff});
    }))
    .catch(console.error);
}
