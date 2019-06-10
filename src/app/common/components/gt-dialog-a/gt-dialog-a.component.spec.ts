import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtDialogAComponent } from './gt-dialog-a.component';

describe('GtDialogAComponent', () => {
  let component: GtDialogAComponent;
  let fixture: ComponentFixture<GtDialogAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtDialogAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtDialogAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
