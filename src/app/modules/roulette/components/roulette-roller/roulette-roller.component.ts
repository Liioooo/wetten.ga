import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {fromEvent, Subscription, timer} from 'rxjs';
import rollRanges from './roll-ranges';
import {map, take} from 'rxjs/operators';
import {RouletteService} from '../../../../shared/services/roullete/roullete.service';
import {Roll} from '../../../../shared/models/Roll';

@Component({
  selector: 'app-roulette-roller',
  templateUrl: './roulette-roller.component.html',
  styleUrls: ['./roulette-roller.component.scss']
})
export class RouletteRollerComponent implements AfterViewInit, OnDestroy {

  private previousRollerSize: number;
  private resizeRollerSubscription: Subscription;

  private latestRollSubscription: Subscription;

  @ViewChild('roller') roller: ElementRef<HTMLDivElement>;

  constructor(private rouletteService: RouletteService) { }

  ngAfterViewInit() {
      this.roller.nativeElement.style.backgroundPositionX = '0px';
      this.previousRollerSize = this.roller.nativeElement.offsetWidth;
      this.resizeRollerSubscription = fromEvent(window, 'resize').subscribe(() => {
          this.roller.nativeElement.style.backgroundPositionX = parseFloat(this.roller.nativeElement.style.backgroundPositionX) - ((this.previousRollerSize - this.roller.nativeElement.offsetWidth) / 2) + 'px';
          this.previousRollerSize = this.roller.nativeElement.offsetWidth;
      });

      let firstTimeRollSet = true;
      this.latestRollSubscription = this.rouletteService.latestRoll$.subscribe((roll: Roll) => {
          if (firstTimeRollSet) {
              this.setRolled(roll.rolledNumber);
              this.rouletteService.finishedAnimation();
              firstTimeRollSet = false;
          } else {
              this.rollTo(roll.rolledNumber);
          }
      });
  }

  public rollTo(toRoll: number) {
      const startPos = parseFloat(this.roller.nativeElement.style.backgroundPositionX) % 2250;
      this.roller.nativeElement.style.backgroundPositionX = startPos + 'px';
      const targetPosition = this.getPositionToRoll(toRoll) + 2250 * 2;
      const distance = targetPosition - startPos;
      const speed = (distance + 0.035 * 350 * 350) / 350;
      timer(10, 10).pipe(
          take(350),
          map(count => count + 1)
      ).subscribe({
          next: count => {
              const newPos = startPos - 0.035 * count * count + speed * count;
              if (Math.abs(newPos - targetPosition) > 6) {
                  this.roller.nativeElement.style.backgroundPositionX = newPos + 'px';
              }
          },
          complete: () => this.rouletteService.finishedAnimation()
      });
  }

  public setRolled(rolled: number) {
      this.roller.nativeElement.style.backgroundPositionX = this.getPositionToRoll(rolled) + 'px';
  }

  private getPositionToRoll(toRoll: number): number {
      const range = rollRanges[toRoll];
      range[0] = range[0] + 8;
      range[1] = range[1] - 8;
      const pos = Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
      return pos + this.roller.nativeElement.offsetWidth / 2;
  }

  ngOnDestroy() {
    if (this.resizeRollerSubscription) {
      this.resizeRollerSubscription.unsubscribe();
    }
    if (this.latestRollSubscription) {
        this.latestRollSubscription.unsubscribe();
    }
  }

}
