import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Echart3dComponent } from './echart3d.component';

describe('Echart3dComponent', () => {
  let component: Echart3dComponent;
  let fixture: ComponentFixture<Echart3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Echart3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Echart3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
