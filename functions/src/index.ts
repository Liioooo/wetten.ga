import * as admin from 'firebase-admin';
admin.initializeApp();

export { updateRolls } from './updateRolls';
export { newUser } from './newUser';
export { sendMoney } from './sendMoney';
// export { removeMoney } from './removeMoney';
// Removed because of security issues
