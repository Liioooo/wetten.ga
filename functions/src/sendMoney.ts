import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Transaction} from './models/Transaction';

const db = admin.firestore();
export const sendMoney = functions.firestore
  .document('coinTransactions/{transactionId}')
  .onCreate(async (snap, context) => {
      const coinTransactionData = snap.data() as Transaction;
      await db.runTransaction(transaction => transaction.getAll(coinTransactionData.from, coinTransactionData.to)
        .then(docs => {
            if(docs.every(doc => doc.exists)) {
              const [from, to] = docs;
              const fromUserData = from.data();
              const toUserData = to.data();
              if(fromUserData && toUserData) {
                transaction.update(from.ref, {amount: fromUserData.amount - coinTransactionData.amount});
                transaction.update(to.ref, {amount: toUserData.amount + coinTransactionData.amount});
              }
            }
          transaction.delete(snap.ref);
        }));
      return "done";
  });
