import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoulettRollerComponent } from './roulett-roller.component';

describe('RoulettRollerComponent', () => {
  let component: RoulettRollerComponent;
  let fixture: ComponentFixture<RoulettRollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoulettRollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoulettRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
