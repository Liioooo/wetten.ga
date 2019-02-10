import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Roll} from '../../models/Roll';

@Injectable({
  providedIn: 'root'
})
export class RouletteService {


    private _rollHistory$: Observable<Roll[]>;

    constructor(private database: AngularFireDatabase) {
        this._rollHistory$ = database.list<Roll>('/rolls').valueChanges();
    }

    public get rollHistory$(): Observable<Roll[]> {
        return this._rollHistory$;
    }
}
