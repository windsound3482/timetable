import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapetableComponent } from './shapetable.component';

describe('ShapetableComponent', () => {
  let component: ShapetableComponent;
  let fixture: ComponentFixture<ShapetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
