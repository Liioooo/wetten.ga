import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bet-amount-chooser',
  templateUrl: './bet-amount-chooser.component.html',
  styleUrls: ['./bet-amount-chooser.component.scss']
})
export class BetAmountChooserComponent implements OnInit {

  public balance = 100;
  public betAmount = 0;

  constructor() { }

  ngOnInit() {
  }

  public clearAmount() {
    this.betAmount = 0;
  }

  public maxAmount() {
    this.betAmount = this.balance;
  }

  public addAmount(toAdd: number) {
    this.betAmount += toAdd;
  }

  public multiply(toMultipy: number) {
    this.betAmount *= toMultipy;
  }

  public hasEnough(toAdd: number): boolean {
      return this.betAmount + toAdd <= this.balance;
  }

  public hasEnoughMultiply(toMultiply): boolean {
    return this.betAmount * toMultiply <= this.balance;
  }

  public typedInAmountField() {
    if (this.betAmount < 0) {
      this.betAmount = 0;
    }
    if (this.betAmount > this.balance) {
      this.betAmount = this.balance;
    }
  }

}