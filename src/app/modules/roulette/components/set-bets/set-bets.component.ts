import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth/auth.service';
import {BetService} from '@shared/services/bet/bet.service';
import {Observable, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-set-bets',
  templateUrl: './set-bets.component.html',
  styleUrls: ['./set-bets.component.scss']
})
export class SetBetsComponent implements OnInit {


  @Input()
  type: '1-7' | '8-14' | '0';

  private typeKey: string;
  public bets: Observable<{name, amount}[]>;

  constructor(
    public authService: AuthService,
    public betService: BetService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.typeKey = this.getKeyForType(this.type);
    this.bets = this.betService.allBets.pipe(
        map(bets => bets.filter(bet => (bet[this.typeKey] !== undefined && bet[this.typeKey] !== 0))),
        map(bets => bets.map(bet => {
          return {name: bet.user['displayName'], amount: bet[this.typeKey]};
        }))
    );
  }


  public getKeyForType(type: '1-7' | '8-14' | '0'): string {
    let key: string;
    switch (type) {
      case '1-7':
        key = 'redAmount';
        break;
      case '0':
        key = 'greenAmount';
        break;
      case '8-14':
        key = 'blackAmount';
        break;
    }
    return key;
  }

  placeBet(type: string) {
    if (this.betService.betAmount <= 0) {
        this.toastrService.error('Please choose a valid amount', 'Amount missing');
    } else {
        this.betService.setBet(type);
    }
  }
}
