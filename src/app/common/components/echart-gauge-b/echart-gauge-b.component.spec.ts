import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartGaugeBComponent } from './echart-gauge-b.component';

describe('EchartGaugeBComponent', () => {
  let component: EchartGaugeBComponent;
  let fixture: ComponentFixture<EchartGaugeBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartGaugeBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartGaugeBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
