import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencytableComponent } from './agencytable.component';

describe('AgencytableComponent', () => {
  let component: AgencytableComponent;
  let fixture: ComponentFixture<AgencytableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencytableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
