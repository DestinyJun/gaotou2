import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtLoadingComponent } from './gt-loading.component';

describe('GtLoadingComponent', () => {
  let component: GtLoadingComponent;
  let fixture: ComponentFixture<GtLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
