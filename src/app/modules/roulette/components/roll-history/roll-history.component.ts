import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouletteService} from '../../../../shared/services/roullete/roullete.service';
import {Roll} from '../../../../shared/models/Roll';
import {AnimationFinishedService} from '../../services/animation-finished.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-roll-history',
  templateUrl: './roll-history.component.html',
  styleUrls: ['./roll-history.component.scss']
})
export class RollHistoryComponent implements OnInit, OnDestroy {

  public rollHistory: Roll[];
  private rollHistoryDelayed: Roll[];

  private rollHistorySubscription: Subscription;
  private animationFinishedSubscription: Subscription;

  constructor(public rouletteService: RouletteService, private animationFinishedService: AnimationFinishedService) { }

  private getClass(num: number): string {
    if (num === 0) {
      return 'bg-success';
    } else if (num <= 7 && num > 0) {
      return 'bg-danger';
    } else if (num >= 8) {
      return 'bg-dark-fix';
    }
    return '';
  }

  
  ngOnInit() {
    this.rollHistorySubscription = this.rouletteService.rollHistory$.subscribe(history => this.rollHistoryDelayed = history);
    this.animationFinishedSubscription = this.animationFinishedService.animationFinished.subscribe(() => {
      this.rollHistory = this.rollHistoryDelayed;
    });
  }
  
  ngOnDestroy() {
    this.rollHistorySubscription.unsubscribe();
    this.animationFinishedSubscription.unsubscribe();
  }

}
