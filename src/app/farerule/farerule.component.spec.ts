import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FareruleComponent } from './farerule.component';

describe('FareruleComponent', () => {
  let component: FareruleComponent;
  let fixture: ComponentFixture<FareruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FareruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FareruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
