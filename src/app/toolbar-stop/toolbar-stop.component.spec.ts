import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarStopComponent } from './toolbar-stop.component';

describe('ToolbarStopComponent', () => {
  let component: ToolbarStopComponent;
  let fixture: ComponentFixture<ToolbarStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarStopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
