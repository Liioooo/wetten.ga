import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Roll} from '../../models/Roll';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouletteService {


    private readonly _rollHistory$: Observable<Roll[]>;

    constructor(private database: AngularFireDatabase) {
        this._rollHistory$ = database.list<Roll>('/rolls')
          .snapshotChanges()
          .pipe(
              map(actions => {
              return actions.map(action => {
                const data = action.payload.exportVal();
                const id = action.payload.key;
                return {id, ...data} as Roll;
                });
              }),
            distinctUntilChanged((p: Roll[], q: Roll[]) => p[p.length - 1].timestamp === q[q.length - 1].timestamp),
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
}
