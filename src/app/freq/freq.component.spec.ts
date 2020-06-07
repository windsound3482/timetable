import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreqComponent } from './freq.component';

describe('FreqComponent', () => {
  let component: FreqComponent;
  let fixture: ComponentFixture<FreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
