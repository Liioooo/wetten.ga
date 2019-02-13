import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-set-bets',
  templateUrl: './set-bets.component.html',
  styleUrls: ['./set-bets.component.scss']
})
export class SetBetsComponent implements OnInit {

  @Input()
  type: '1-7' | '8-7' | '0';

  constructor() { }

  ngOnInit() {

  }

}
