import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationFinishedService {

  private _animationFinished: Subject<any>;

  constructor() {
    this._animationFinished = new Subject<any>();
  }

  public get animationFinished(): Observable<any> {
    return this._animationFinished.asObservable();
  }

  public emitFinished() {
    this._animationFinished.next();
  }
}
