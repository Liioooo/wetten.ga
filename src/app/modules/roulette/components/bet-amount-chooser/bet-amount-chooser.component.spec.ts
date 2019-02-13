import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetAmountChooserComponent } from './bet-amount-chooser.component';

describe('BetAmountChooserComponent', () => {
  let component: BetAmountChooserComponent;
  let fixture: ComponentFixture<BetAmountChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetAmountChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetAmountChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
