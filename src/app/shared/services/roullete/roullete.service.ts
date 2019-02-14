import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Roll} from '../../models/Roll';
import {debounce, distinctUntilChanged, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

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

    public get timeToNextRoll(): Observable<number> {
        return of(20); // TODO: implement
    }

    public finishedAnimation() {
        this._animationFinished.next();
    }
}
