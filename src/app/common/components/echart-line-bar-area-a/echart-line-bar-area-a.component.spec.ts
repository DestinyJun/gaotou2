import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartLineBarAreaAComponent } from './echart-line-bar-area-a.component';

describe('EchartLineBarAreaAComponent', () => {
  let component: EchartLineBarAreaAComponent;
  let fixture: ComponentFixture<EchartLineBarAreaAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartLineBarAreaAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartLineBarAreaAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
