import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltercalenComponent } from './altercalen.component';

describe('AltercalenComponent', () => {
  let component: AltercalenComponent;
  let fixture: ComponentFixture<AltercalenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltercalenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltercalenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
