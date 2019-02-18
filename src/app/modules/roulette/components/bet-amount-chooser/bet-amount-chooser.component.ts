import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {Subscription} from 'rxjs';
import {BetService} from '../../../../shared/services/bet/bet.service';

@Component({
  selector: 'app-bet-amount-chooser',
  templateUrl: './bet-amount-chooser.component.html',
  styleUrls: ['./bet-amount-chooser.component.scss']
})
export class BetAmountChooserComponent implements OnInit, OnDestroy {

  public balance = 0;
  private balanceSubscription: Subscription;

  constructor(
    private authService: AuthService,
    public betService: BetService
  ) { }

  ngOnInit() {
    this.balanceSubscription = this.authService.user$.subscribe(user => {
        this.balance = user.amount;
    });
  }

  public clearAmount() {
    this.betService.betAmount = 0;
  }

  public maxAmount() {
    this.betService.betAmount = this.balance;
  }

  public addAmount(toAdd: number) {
    this.betService.betAmount += toAdd;
  }

  public multiply(toMultipy: number) {
    this.betService.betAmount *= toMultipy;
  }

  public hasEnough(toAdd: number): boolean {
      return this.betService.betAmount + toAdd <= this.balance;
  }

  public hasEnoughMultiply(toMultiply): boolean {
    return this.betService.betAmount * toMultiply <= this.balance;
  }

  public typedInAmountField() {
    if (this.betService.betAmount < 0) {
      this.betService.betAmount = 0;
    }
    if (this.betService.betAmount > this.balance) {
      this.betService.betAmount = this.balance;
    }
  }

  ngOnDestroy() {
      this.balanceSubscription.unsubscribe();
  }

}
