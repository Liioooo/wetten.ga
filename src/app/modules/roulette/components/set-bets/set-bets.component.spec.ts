import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBetsComponent } from './set-bets.component';

describe('SetBetsComponent', () => {
  let component: SetBetsComponent;
  let fixture: ComponentFixture<SetBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
