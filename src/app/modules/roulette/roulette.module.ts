import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouletteRoutingModule } from './roulette-routing.module';
import { RouletteComponent } from './components/roulette/roulette.component';
import { RouletteRollerComponent } from './components/roulette-roller/roulette-roller.component';
import {SharedModule} from '../../shared/shared.module';
import { RollHistoryComponent } from './components/roll-history/roll-history.component';
import { ChatComponent } from './components/chat/chat.component';
import {BetAmountChooserComponent} from './components/bet-amount-chooser/bet-amount-chooser.component';
import {FormsModule} from '@angular/forms';
import {SetBetsComponent} from './components/set-bets/set-bets.component';
import {ChatService} from './services/chat.service';

@NgModule({
  declarations: [
      RouletteComponent,
      RouletteRollerComponent,
      RollHistoryComponent,
      ChatComponent,
      BetAmountChooserComponent,
      SetBetsComponent
  ],
    imports: [
        CommonModule,
        RouletteRoutingModule,
        SharedModule,
        FormsModule
    ],
    providers: [ChatService]
})
export class RouletteModule { }
