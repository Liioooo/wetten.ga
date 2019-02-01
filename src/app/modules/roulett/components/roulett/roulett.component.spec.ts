import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoulettComponent } from './roulett.component';

describe('RoulettComponent', () => {
  let component: RoulettComponent;
  let fixture: ComponentFixture<RoulettComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoulettComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoulettComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
