import * as functions from 'firebase-functions';
// import * as sendgridemail from '@sendgrid/mail';
// import {SENDGRID_API_KEY} from './environment';
import {User} from './models/User';
import * as admin from 'firebase-admin';

const db = admin.firestore();
// sendgridemail.setApiKey(SENDGRID_API_KEY);


export const newUser = functions.firestore
  .document('users/{userId}')
  .onCreate(async event => {
    const userData = event.data() as User;
    await event.ref.set({
      amount: 0,
      registeredSince: admin.firestore.Timestamp.now()
    }, {merge: true});

    const ref = await db.doc(`bets/${userData.uid}`);
    await ref.set({
      redAmount: 0,
      blackAmount: 0,
      greenAmount: 0,
      user: event.ref
    }, {merge: true});

    // try {
    //   return sendgridemail.send({
    //     to: userData.email,
    //     from: 'leo@leo.com',
    //     subject: 'Servas',
    //     text: 'das geht so nid',
    //     html: '<strong>hey</strong>'
    //   });
    // } catch (e) {
    //   console.log('Error sending email!');
    //   return;
    // }
  });
