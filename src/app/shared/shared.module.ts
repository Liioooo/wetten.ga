import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestService} from './services/test/test.service';
import { SharedComponent } from './components/shared/shared.component';

@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule
  ],
  exports: [SharedComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TestService],
    };
  }
}
