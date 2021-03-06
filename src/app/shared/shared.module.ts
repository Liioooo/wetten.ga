import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './services/auth/auth.service';
import {AuthGuard} from './guards/auth/auth.guard';
import {RouletteService} from './services/roullete/roullete.service';
import {ToastrModule} from 'ngx-toastr';
import {PwaService} from '@shared/services/pwa/pwa.service';
import {NotAuthGuard} from '@shared/guards/not-auth/not-auth.guard';


@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      ToastrModule.forRoot({
        closeButton: true,
        extendedTimeOut: 3000,
        positionClass: 'toast-bottom-left'
        })
  ],
  exports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AuthGuard, NotAuthGuard, RouletteService, PwaService]
    };
  }
}
