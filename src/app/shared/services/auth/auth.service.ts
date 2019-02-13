import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {User} from '../../models/User';
import {distinctUntilChanged, map, switchMap, take, tap} from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _user$: Observable<User>;

  constructor(private fireAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
      this._user$ = this.fireAuth.authState.pipe(
          switchMap(user => {
              if (user) {
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


  public async signIn() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.fireAuth.auth.signInWithPopup(provider);
      console.log(credential)
      return this.updateUserData(credential);
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    this.router.navigate(['/home']);
  }

  private updateUserData(credentials) {
      const {uid, displayName, photoURL, email, phoneNumber} = credentials.user;
      const {family_name, given_name, gender} = credentials.additionalUserInfo.profile;
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

      const data = {
          uid,
          displayName,
          photoURL,
          email,
          family_name,
          given_name,
          gender,
          phoneNumber
      };

      for (const key in data) {
        if (!data[key]) {
          delete data[key];
        }
      }

      return userRef.set(data, {merge: true});
  }

}
