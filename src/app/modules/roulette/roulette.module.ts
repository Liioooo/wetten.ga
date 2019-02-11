import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouletteRoutingModule } from './roulette-routing.module';
import { RouletteComponent } from './components/roulette/roulette.component';
import { RouletteRollerComponent } from './components/roulette-roller/roulette-roller.component';
import {SharedModule} from '../../shared/shared.module';
import { RollHistoryComponent } from './components/roll-history/roll-history.component';
import { ChatComponent } from './components/chat/chat.component';
import {AnimationFinishedService} from './services/animation-finished.service';

@NgModule({
  declarations: [RouletteComponent, RouletteRollerComponent, RollHistoryComponent, ChatComponent],
    imports: [
        CommonModule,
        RouletteRoutingModule,
        SharedModule
    ],
    providers: [AnimationFinishedService]
})
export class RouletteModule { }
