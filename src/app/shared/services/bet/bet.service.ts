import {Injectable, OnDestroy} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {combineLatest, Observable, of, Subscription, timer} from 'rxjs';
import {Bet} from '../../models/Bet';
import {debounce, delay, map, mergeMap, multicast, share, switchMap, tap} from 'rxjs/operators';
import {joinCollections} from '../../rxjs-operators/joinCollections';
import {ToastrService} from 'ngx-toastr';
import {RouletteService} from '@shared/services/roullete/roullete.service';
import {debounceWithoutFirst} from '@shared/rxjs-operators/debounceWithoutFirst';

@Injectable({
  providedIn: 'root'
})
export class BetService implements OnDestroy {

  public betAmount = 0;

  private betDoc: AngularFirestoreDocument<any>;
  private subscription: Subscription;
  private _bets: Observable<Bet>;
  
  constructor(
    private rouletteService: RouletteService,
    private authService: AuthService,
    private afs: AngularFirestore,
    private toastrService: ToastrService
  ) {
    this.subscription = this.authService.user$.subscribe(user => {
      if (user) {
          const doc = this.afs.doc<Bet>(`bets/${user.uid}`);
          this.betDoc = doc;
          this._bets = doc.valueChanges().pipe(
              debounce(all => {
                  if (this.rouletteService.timeToNextRollValue < 4) {
                      return this.rouletteService.animationFinished;
                  } else {
                      return of(undefined);
                  }
              }),
          );
      }
    });
  }

  get bets(): Observable<Bet> {
    return this._bets;
  }

  get allBets(): Observable<Bet[]> {
    const red$ = this.afs.collection<Bet>('bets', ref => ref.where('redAmount', '>', 0))
      .snapshotChanges();
    const green$ = this.afs.collection<Bet>('bets', ref => ref.where('greenAmount', '>', 0))
      .snapshotChanges();
    const black$ = this.afs.collection<Bet>('bets', ref => ref.where('blackAmount', '>', 0))
      .snapshotChanges();

    return combineLatest<any[]>(red$, green$, black$)
      .pipe(
          switchMap(all => of([...all[0], ...all[1], ...all[2]])),
          map(snap => {const bets = [];
            for (let i = 0; i < snap.length; i++) {
              let included = false;
              for (let j = 0; j < bets.length; j++) {if (snap[i].payload.doc.id === bets[j].payload.doc.id) {
                  included = true;
                  break;
                }
              }
              if (!included) { bets.push(snap[i]); }
            }
          return bets.map(bet => bet.payload.doc.data());
          }),
          joinCollections('user', 'uid', 'users', this.afs),
          debounce(all => {
              if (this.rouletteService.timeToNextRollValue < 4) {
                  return this.rouletteService.animationFinished;
              } else {
                  return of(undefined);
              }
          }),
      );
  }

  get currentBalance(): Observable<number> {
      return this.authService.user$.pipe(
          switchMap(user => {
              return this.bets.pipe(
                  map(bets => {
                      return user.amount - bets.blackAmount - bets.greenAmount - bets.redAmount;
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
        } else {
          const newAmount = this.betAmount + currentBetDoc.data()[bet];
          await transaction.update(this.betDoc.ref, {[bet]: newAmount, user: this.authService.userRef.ref});
        }
        return this.betAmount;
      });
      this.toastrService.success(`Added ${amount} on ${bet.replace('Amount', '')} bet`, 'Nice!');
  }

  /*async deleteBet() {
    await this.betDoc.delete();
  }*/

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
