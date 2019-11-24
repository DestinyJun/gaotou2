import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsBarTemComponent } from './echarts-bar-tem.component';

describe('EchartsBarTemComponent', () => {
  let component: EchartsBarTemComponent;
  let fixture: ComponentFixture<EchartsBarTemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsBarTemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsBarTemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
