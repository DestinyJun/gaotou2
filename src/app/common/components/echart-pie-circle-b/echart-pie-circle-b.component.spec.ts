import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartPieCircleBComponent } from './echart-pie-circle-b.component';

describe('EchartPieCircleBComponent', () => {
  let component: EchartPieCircleBComponent;
  let fixture: ComponentFixture<EchartPieCircleBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartPieCircleBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartPieCircleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
