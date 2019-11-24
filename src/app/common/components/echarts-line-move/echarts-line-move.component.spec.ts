import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsLineMoveComponent } from './echarts-line-move.component';

describe('EchartsLineMoveComponent', () => {
  let component: EchartsLineMoveComponent;
  let fixture: ComponentFixture<EchartsLineMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsLineMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsLineMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
