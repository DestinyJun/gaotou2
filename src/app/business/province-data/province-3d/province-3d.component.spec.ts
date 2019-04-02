import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Province3dComponent } from './province-3d.component';

describe('Service3dComponent', () => {
  let component: Province3dComponent;
  let fixture: ComponentFixture<Province3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Province3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Province3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
