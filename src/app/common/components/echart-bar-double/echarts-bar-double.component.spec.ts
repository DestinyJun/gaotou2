import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsBarDoubleComponent } from './echarts-bar-double.component';

describe('EchartsBarDoubleComponent', () => {
  let component: EchartsBarDoubleComponent;
  let fixture: ComponentFixture<EchartsBarDoubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsBarDoubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsBarDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
