import { Injectable } from '@angular/core';
import {interval, Observable, of, Subject} from 'rxjs';
import {Roll} from '../../models/Roll';
import {concatMap, debounce, distinctUntilChanged, map, mergeMap, switchMap, tap, timestamp} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class RouletteService {

    public readonly ROLL_INTERVAL = 30;

    private readonly _animationFinished: Subject<any>;
    private readonly _rollHistory$: Observable<Roll[]>;

    constructor(private afs: AngularFirestore) {
        this._animationFinished = new Subject<any>();
        this._rollHistory$ = this.afs.collection<Roll>('rolls', ref => ref.orderBy('timestamp'))
        .snapshotChanges()
          .pipe(
            map(actions => {
              return actions.map(action => {
                const data = action.payload.doc.data();
                const id = action.payload.doc.id;
                return {id, ...data} as Roll;
              });
            }),
            distinctUntilChanged((p: Roll[], q: Roll[]) => p[p.length - 1].timestamp.isEqual(q[q.length - 1].timestamp))
          ) as Observable<Roll[]>;
    }

    public get rollHistoryWithAnimationDelay$(): Observable<Roll[]> {
        return this._rollHistory$.pipe(
            debounce(() => this._animationFinished),
        );
    }

    public get rollHistory$(): Observable<Roll[]> {
        return this._rollHistory$;
    }

    public get latestRoll$(): Observable<Roll> {
        return this._rollHistory$.pipe(
            map(history => history[history.length - 1])
        );
    }

    public get lastRollTime(): Observable<Timestamp> {
        return this.latestRoll$.pipe(
          map(roll => roll.timestamp)
        );
    }

    public get timeToNextRoll(): Observable<number> {
        return this.lastRollTime.pipe(
          debounce(() => this._animationFinished),
          switchMap(lt => {
              return interval(15).pipe(
                  map(t => {
                      let time = (lt.toMillis() + this.ROLL_INTERVAL * 1000 - Timestamp.now().toMillis()) / 1000;
                      if (time < 0) {
                          time = 0;
                      }
                      return time;
                  })
              );
          })
        );
    }

    public finishedAnimation() {
        this._animationFinished.next();
    }
}
