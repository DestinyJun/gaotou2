import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsRoseFigureComponent } from './echarts-rose-figure.component';

describe('EchartsRoseFigureComponent', () => {
  let component: EchartsRoseFigureComponent;
  let fixture: ComponentFixture<EchartsRoseFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsRoseFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsRoseFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
