import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './components/shared/shared.component';
import {AuthService} from './services/auth/auth.service';


@NgModule({
  declarations: [SharedComponent],
  imports: [
      CommonModule,
  ],
  exports: [SharedComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AuthService],
    };
  }
}
