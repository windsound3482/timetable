import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayComponent } from './pathway.component';

describe('PathwayComponent', () => {
  let component: PathwayComponent;
  let fixture: ComponentFixture<PathwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
