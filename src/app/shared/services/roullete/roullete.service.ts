import { Injectable } from '@angular/core';
import {AngularFireDatabase, snapshotChanges} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Roll} from '../../models/Roll';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RouletteService {


    private readonly _rollHistory$: Observable<Roll[]>;

    constructor(private afs: AngularFirestore) {
      this._rollHistory$ = this.afs.collection<Roll>('rolls')
      .snapshotChanges()
        .pipe(
          map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data();
              console.log(data);
              const id = action.payload.doc.id;
              return {id, ...data} as Roll;
            });
          }),
          distinctUntilChanged((p: Roll[], q: Roll[]) => p[p.length - 1].timestamp.isEqual(q[q.length - 1].timestamp))
        ) as Observable<Roll[]>;
    }

    public get rollHistory$(): Observable<Roll[]> {
        return this._rollHistory$;
    }

    public get latestRoll$(): Observable<Roll> {
        return this._rollHistory$.pipe(
            map(history => history[history.length - 1])
        );
    }
}
