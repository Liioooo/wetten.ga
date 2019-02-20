import {Component, OnInit} from '@angular/core';
import {RouletteService} from '@shared/services/roullete/roullete.service';
import {Roll} from '@shared/models/Roll';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-roll-history',
  templateUrl: './roll-history.component.html',
  styleUrls: ['./roll-history.component.scss']
})
export class RollHistoryComponent implements OnInit {

  public rollHistory$: Observable<Roll[]>;

  constructor(public rouletteService: RouletteService) { }

  ngOnInit() {
    this.rollHistory$ = this.rouletteService.rollHistoryWithAnimationDelay$;
  }

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

  public trackByCreated(index, item): void {
    return item.id;
  }

}

