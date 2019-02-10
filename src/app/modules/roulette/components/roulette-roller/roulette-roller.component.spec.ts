import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteRollerComponent } from './roulette-roller.component';

describe('RoulettRollerComponent', () => {
  let component: RouletteRollerComponent;
  let fixture: ComponentFixture<RouletteRollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouletteRollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouletteRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
