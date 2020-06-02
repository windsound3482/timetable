import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaretoolbarComponent } from './faretoolbar.component';

describe('FaretoolbarComponent', () => {
  let component: FaretoolbarComponent;
  let fixture: ComponentFixture<FaretoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaretoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaretoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
