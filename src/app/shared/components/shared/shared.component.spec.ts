import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCComponent } from './shared.component';

describe('SharedCComponent', () => {
  let component: SharedCComponent;
  let fixture: ComponentFixture<SharedCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
