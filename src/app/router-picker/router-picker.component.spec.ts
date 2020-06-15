import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterPickerComponent } from './router-picker.component';

describe('RouterPickerComponent', () => {
  let component: RouterPickerComponent;
  let fixture: ComponentFixture<RouterPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
