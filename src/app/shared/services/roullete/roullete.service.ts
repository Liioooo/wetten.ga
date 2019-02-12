import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Roll} from '../../models/Roll';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouletteService {


    private readonly _rollHistory$: Observable<Roll[]>;

    constructor(private database: AngularFireDatabase) {
        this._rollHistory$ = database.list<Roll>('/rolls').valueChanges();
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
