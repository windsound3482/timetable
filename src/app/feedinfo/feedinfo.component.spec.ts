import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedinfoComponent } from './feedinfo.component';

describe('FeedinfoComponent', () => {
  let component: FeedinfoComponent;
  let fixture: ComponentFixture<FeedinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
