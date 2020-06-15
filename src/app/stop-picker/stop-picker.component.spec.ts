import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopPickerComponent } from './stop-picker.component';

describe('StopPickerComponent', () => {
  let component: StopPickerComponent;
  let fixture: ComponentFixture<StopPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
