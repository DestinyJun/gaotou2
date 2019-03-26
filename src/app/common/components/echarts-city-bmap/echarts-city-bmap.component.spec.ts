import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsCityBmapComponent } from './echarts-city-bmap.component';

describe('EchartsCityBmapComponent', () => {
  let component: EchartsCityBmapComponent;
  let fixture: ComponentFixture<EchartsCityBmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsCityBmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsCityBmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
