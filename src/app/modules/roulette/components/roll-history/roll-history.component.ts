import {Component, OnInit} from '@angular/core';
import {RouletteService} from '../../../../shared/services/roullete/roullete.service';
import {Roll} from '../../../../shared/models/Roll';
import {AnimationFinishedService} from '../../services/animation-finished.service';
import {Observable} from 'rxjs';
import {debounce} from 'rxjs/operators';

@Component({
  selector: 'app-roll-history',
  templateUrl: './roll-history.component.html',
  styleUrls: ['./roll-history.component.scss']
})
export class RollHistoryComponent implements OnInit {

  public rollHistory$: Observable<Roll[]>;

  constructor(public rouletteService: RouletteService, private animationFinishedService: AnimationFinishedService) { }

  ngOnInit() {
    this.rollHistory$ = this.rouletteService.rollHistory$.pipe(
        debounce(() => this.animationFinishedService.animationFinished)
    );
  }

}
