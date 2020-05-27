import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbForCalenComponent } from './tb-for-calen.component';

describe('TbForCalenComponent', () => {
  let component: TbForCalenComponent;
  let fixture: ComponentFixture<TbForCalenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbForCalenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbForCalenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
