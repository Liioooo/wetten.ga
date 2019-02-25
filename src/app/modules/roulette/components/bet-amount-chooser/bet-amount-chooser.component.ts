import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BetService} from '@shared/services/bet/bet.service';

@Component({
  selector: 'app-bet-amount-chooser',
  templateUrl: './bet-amount-chooser.component.html',
  styleUrls: ['./bet-amount-chooser.component.scss']
})
export class BetAmountChooserComponent implements OnInit, OnDestroy {

  public balance: number;
  private balanceSubscription: Subscription;

  constructor(public betService: BetService) { }

  ngOnInit() {
    this.balanceSubscription = this.betService.currentBalance.subscribe(balance => {
        this.balance = balance;
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
    this.betService.betAmount = Math.round(this.betService.betAmount * toMultipy * 100) / 100;
  }

  public hasEnough(toAdd: number): boolean {
      return this.betService.betAmount + toAdd <= this.balance;
  }

  public hasEnoughMultiply(toMultiply): boolean {
    return this.betService.betAmount * toMultiply <= this.balance;
  }

  ngOnDestroy() {
      this.balanceSubscription.unsubscribe();
  }

}
