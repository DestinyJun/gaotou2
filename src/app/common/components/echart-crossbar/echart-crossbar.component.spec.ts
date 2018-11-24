import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartCrossbarComponent } from './echart-crossbar.component';

describe('EchartCrossbarComponent', () => {
  let component: EchartCrossbarComponent;
  let fixture: ComponentFixture<EchartCrossbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartCrossbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartCrossbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
