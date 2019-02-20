import {Injectable, OnDestroy} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {combineLatest, Observable, ObservableInput, of, Subscription} from 'rxjs';
import {Bet} from '../../models/Bet';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {joinCollections} from '../../rxjs-operators/joinCollections';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BetService implements OnDestroy {

  public betAmount = 0;

  private betDoc: AngularFirestoreDocument<any>;
  private subscription: Subscription;
  private _bets: Observable<Bet>;
  private _userMoney: number;
  
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private toastrService: ToastrService
  ) {
    this.subscription = this.authService.user$.subscribe(user => {
      if (user) {
          const doc = this.afs.doc<Bet>(`bets/${user.uid}`);
          this.betDoc = doc;
          this._bets = doc.valueChanges();
          this._userMoney = user.amount;
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

  get currentBalance(): Observable<number> {
        return this.bets.pipe(
            mergeMap(bets => {
                return this.authService.user$.pipe(
                    map(user => user.amount),
                    map(balance => {
                        return balance - bets.blackAmount - bets.greenAmount - bets.redAmount;
                    })
                );
            })
        );
  }

  async setBet(bet: string) {
      const amount = await this.afs.firestore.runTransaction(async transaction => {
        const currentBetDoc = await transaction.get(this.betDoc.ref);
        if (!currentBetDoc.exists) {
          await transaction.update(this.betDoc.ref, {[bet]: this.betAmount, user: this.authService.userRef.ref});
          return this.betAmount;
        } else {
          const newAmount = this.betAmount + currentBetDoc.data()[bet];
          await transaction.update(this.betDoc.ref, {[bet]: newAmount, user: this.authService.userRef.ref});
          return newAmount;
        }
      });
      this.toastrService.success(`Added ${amount} to ${bet.replace('Amount', '')} bet`, 'Nice!');
  }

  /*async deleteBet() {
    await this.betDoc.delete();
  }*/

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
