import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTimesComponent } from './stop-times.component';

describe('StopTimesComponent', () => {
  let component: StopTimesComponent;
  let fixture: ComponentFixture<StopTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
