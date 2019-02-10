import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {fromEvent, Subscription, timer} from 'rxjs';
import rollRanges from './roll-ranges';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-roulett-roller',
  templateUrl: './roulett-roller.component.html',
  styleUrls: ['./roulett-roller.component.scss']
})
export class RoulettRollerComponent implements AfterViewInit, OnDestroy {

  private previousRollerSize: number;
  private resizeRollerSubscription: Subscription;

  @ViewChild('roller') roller: ElementRef<HTMLDivElement>;

  constructor() { }

  ngAfterViewInit() {
      this.roller.nativeElement.style.backgroundPositionX = '0px';
      this.previousRollerSize = this.roller.nativeElement.offsetWidth;
      this.resizeRollerSubscription = fromEvent(window, 'resize').subscribe(() => {
          this.roller.nativeElement.style.backgroundPositionX = parseFloat(this.roller.nativeElement.style.backgroundPositionX) - ((this.previousRollerSize - this.roller.nativeElement.offsetWidth) / 2) + 'px';
          this.previousRollerSize = this.roller.nativeElement.offsetWidth;
    });
  }

  public rollTo(toRoll: number) {
      const startPos = parseFloat(this.roller.nativeElement.style.backgroundPositionX) % 2250;
      this.roller.nativeElement.style.backgroundPositionX = startPos + 'px';
      const targetPosition = this.getPositionToRoll(toRoll) + 2250 * 2;
      console.log(targetPosition, 'target');
      const distance = targetPosition - startPos;
      const speed = (distance + 0.07 * 250 * 250) / 250;
      timer(10, 10).pipe(
          take(250),
          map(count => count + 1)
      ).subscribe(count => {
          const newPos = startPos - 0.07 * count * count + speed * count;
          console.log(Math.abs(newPos - targetPosition));
          if (Math.abs(newPos - targetPosition) > 6) {
              this.roller.nativeElement.style.backgroundPositionX = newPos + 'px';
          }
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
  }

}
