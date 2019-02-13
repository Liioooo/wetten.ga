import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {User} from '../../models/User';
import {map, switchMap, take} from 'rxjs/operators';
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

  public get user$() {
      return this._user$;
  }


  public async signIn() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.fireAuth.auth.signInWithPopup(provider);
      return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    this.router.navigate(['/home']);
  }

  private updateUserData({uid, displayName, photoURL}: User) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
      const data = {
          uid,
          displayName,
          photoURL
      };

      return userRef.set(data, {merge: true});
  }

}
