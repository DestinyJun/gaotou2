import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartPieCircleAComponent } from './echart-pie-circle-a.component';

describe('EchartPieCircleAComponent', () => {
  let component: EchartPieCircleAComponent;
  let fixture: ComponentFixture<EchartPieCircleAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartPieCircleAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartPieCircleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
