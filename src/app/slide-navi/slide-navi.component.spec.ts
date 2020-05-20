import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideNaviComponent } from './slide-navi.component';

describe('SlideNaviComponent', () => {
  let component: SlideNaviComponent;
  let fixture: ComponentFixture<SlideNaviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideNaviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideNaviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
