import {Injectable, OnDestroy} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, ObservableInput, Subscription} from 'rxjs';
import {Bet} from '../../models/Bet';

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
      const doc = this.afs.doc(`bets/${user.uid}`);
      this.betDoc = doc;
      this._bets = doc.valueChanges();
    });
  }

  get bets(): Observable<Bet> {
    return this._bets;
  }

  async setBet(bet: string) {
    if (this.betAmount > 0) {
      await this.betDoc.set({[bet]: this.betAmount, user: this.authService.userRef.ref}, {merge: true});
    }
  }

  /*async deleteBet() {
    await this.betDoc.delete();
  }*/

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
