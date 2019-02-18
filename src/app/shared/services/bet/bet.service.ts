import {Injectable, OnDestroy} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {combineLatest, Observable, ObservableInput, of, Subscription} from 'rxjs';
import {Bet} from '../../models/Bet';
import {map, switchMap} from 'rxjs/operators';
import {joinCollections} from '../../rxjs-operators/joinCollections';

@Injectable({
  providedIn: 'root'
})
export class BetService implements OnDestroy {

  public betAmount = 0;

  private betDoc: AngularFirestoreDocument<any>;
  private subscription: Subscription;
  private _bets: Observable<Bet>;
  
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore
  ) {
    this.subscription = this.authService.user$.subscribe(user => {
      if (user) {
          const doc = this.afs.doc<Bet>(`bets/${user.uid}`);
          this.betDoc = doc;
          this._bets = doc.valueChanges();
      }
    });
  }

  get bets(): Observable<Bet> {
    return this._bets;
  }

  get allBets(): Observable<Bet[]> {
      return this.afs.collection<Bet>('bets').valueChanges()
          .pipe(
             joinCollections('user', 'uid', 'users', this.afs)
          );
  }

  async setBet(bet: string) {
    if (this.betAmount > -100) {
      this.afs.firestore.runTransaction(async transaction => {
        const currentBetDoc = await transaction.get(this.betDoc.ref);
        if (!currentBetDoc.exists) {
          await transaction.set(this.betDoc.ref, {[bet]: this.betAmount, user: this.authService.userRef.ref}, {merge: true});
        } else {
          await transaction.set(this.betDoc.ref, {[bet]: this.betAmount + currentBetDoc.data()[bet], user: this.authService.userRef.ref}, {merge: true});
        }

      });
    }
  }

  /*async deleteBet() {
    await this.betDoc.delete();
  }*/

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
