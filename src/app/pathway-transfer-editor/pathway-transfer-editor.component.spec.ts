import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwayTransferEditorComponent } from './pathway-transfer-editor.component';

describe('PathwayTransferEditorComponent', () => {
  let component: PathwayTransferEditorComponent;
  let fixture: ComponentFixture<PathwayTransferEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwayTransferEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwayTransferEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
