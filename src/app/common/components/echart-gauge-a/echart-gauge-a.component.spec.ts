import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartGaugeAComponent } from './echart-gauge-a.component';

describe('EchartGaugeAComponent', () => {
  let component: EchartGaugeAComponent;
  let fixture: ComponentFixture<EchartGaugeAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartGaugeAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartGaugeAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
