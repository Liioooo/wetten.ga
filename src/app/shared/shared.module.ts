import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './services/auth/auth.service';
import {AuthGuard} from './guards/auth/auth.guard';
import {RouletteService} from './services/roullete/roullete.service';


@NgModule({
  declarations: [],
  imports: [
      CommonModule,
  ],
  exports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AuthGuard, RouletteService]
    };
  }
}
