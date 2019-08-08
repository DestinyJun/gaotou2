import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsScatterAComponent } from './echarts-scatter-a.component';

describe('EchartsScatterAComponent', () => {
  let component: EchartsScatterAComponent;
  let fixture: ComponentFixture<EchartsScatterAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsScatterAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsScatterAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
