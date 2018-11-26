import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsLineBrokenComponent } from './echarts-line-broken.component';

describe('EchartsLineBrokenComponent', () => {
  let component: EchartsLineBrokenComponent;
  let fixture: ComponentFixture<EchartsLineBrokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsLineBrokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsLineBrokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
