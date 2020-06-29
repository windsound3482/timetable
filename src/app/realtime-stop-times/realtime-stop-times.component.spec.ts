import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeStopTimesComponent } from './realtime-stop-times.component';

describe('RealtimeStopTimesComponent', () => {
  let component: RealtimeStopTimesComponent;
  let fixture: ComponentFixture<RealtimeStopTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeStopTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeStopTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
