import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsRingPieComponent } from './echarts-ring-pie.component';

describe('EchartsRingPieComponent', () => {
  let component: EchartsRingPieComponent;
  let fixture: ComponentFixture<EchartsRingPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsRingPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsRingPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
