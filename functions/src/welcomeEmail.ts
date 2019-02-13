import * as functions from 'firebase-functions';
import * as sendgridemail from '@sendgrid/mail';
import {SENDGRID_API_KEY} from './environment';
import {User} from './models/User';

sendgridemail.setApiKey(SENDGRID_API_KEY);

export const welcomeEmail = functions.firestore
  .document('users/{userId}')
  .onCreate(async event => {
    const userData = event.data() as User;

    try {
      return sendgridemail.send({
        to: userData.email,
        from: 'leo@leo.com',
        subject: 'Servas',
        text: 'das geht so nid',
        html: '<strong>hey</strong>'
      });
    } catch(e) {
      console.log('Error sending email!');
      return;
    }
  });
