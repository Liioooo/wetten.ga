import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {User} from '../../models/User';
import {distinctUntilChanged, first, map, switchMap, take, tap} from 'rxjs/operators';
import { auth } from 'firebase/app';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _user$: Observable<User>;
  private _userRef: AngularFirestoreDocument<User>;

  constructor(private fireAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
      this._user$ = this.fireAuth.authState.pipe(
          switchMap(user => {
              if (user) {
                  this._userRef = this.afs.doc<User>(`users/${user.uid}`);
                  return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
              } else {
                  return of(null);
              }
          })
      );
  }

  public get user$(): Observable<User> {
    return this._user$;
  }

  public get userRef(): AngularFirestoreDocument<User> {
    return this._userRef;
  }

  public async signIn(type: string) {
      const provider = new auth[`${type}AuthProvider`]();
      try {
        const credential = await this.fireAuth.auth.signInWithPopup(provider);
        this.router.navigate(['/home']);
        return this.updateUserData(credential);
      } catch (e) {
        console.error(e);
      }
  }

  public signInEmail(email: string, password: string) {

  }

  public signUp(email: string, password: string) {

  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    this.router.navigate(['/home']);
  }

  private updateUserData(credentials) {
    const {uid, displayName, photoURL, phoneNumber} = credentials.user;
    const {gender, last_name, first_name, family_name = last_name, given_name = first_name, location} = credentials.additionalUserInfo.profile;
    const email = credentials.user.email ? credentials.user.email : credentials.additionalUserInfo.profile.email;

    this._userRef = this.afs.doc(`users/${uid}`);

    const data = {
          uid,
          displayName,
          photoURL,
          email,
          family_name,
          given_name,
          gender,
          phoneNumber,
          location
      };

    for (const key in data) {
        if (data[key] === undefined || data[key] === null) {
          delete data[key];
        }
    }
    return this._userRef.set(data as User, {merge: true});
  }

  public async transferCoins(amount: number, toUserMail: string) {
      const userTransferTo = await this.afs.collection<User>('users', ref => ref.where('email', '==', toUserMail)).valueChanges().pipe(
          take(1),
          map(users => users[0])
      ).toPromise();

      const user = await this.user$.pipe(
          take(1)
      ).toPromise();

      if (userTransferTo === undefined) {
         throw Error('noUser');
      } else if (userTransferTo.uid === user.uid) {
          throw Error('ownUser');
      }

      await this.afs.collection('coinTransactions').add({
          amount,
          from: this._userRef.ref,
          to: this.afs.doc(`users/${userTransferTo.uid}`).ref
      });
      return 'success';
  }

}
