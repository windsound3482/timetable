import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeZoneSelectComponent } from './time-zone-select.component';

describe('TimeZoneSelectComponent', () => {
  let component: TimeZoneSelectComponent;
  let fixture: ComponentFixture<TimeZoneSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeZoneSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeZoneSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
