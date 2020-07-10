import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeTripComponent } from './realtime-trip.component';

describe('RealtimeTripComponent', () => {
  let component: RealtimeTripComponent;
  let fixture: ComponentFixture<RealtimeTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
