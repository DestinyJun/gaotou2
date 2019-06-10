import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartLineAreaComponent } from './echart-line-area.component';

describe('EchartLineAreaComponent', () => {
  let component: EchartLineAreaComponent;
  let fixture: ComponentFixture<EchartLineAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartLineAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartLineAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
