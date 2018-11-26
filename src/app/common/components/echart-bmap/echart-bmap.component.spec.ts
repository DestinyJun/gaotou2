import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartBmapComponent } from './echart-bmap.component';

describe('EchartBmapComponent', () => {
  let component: EchartBmapComponent;
  let fixture: ComponentFixture<EchartBmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartBmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartBmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
