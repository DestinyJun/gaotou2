import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartBarDoubleAComponent } from './echart-bar-double-a.component';

describe('EchartBarDoubleAComponent', () => {
  let component: EchartBarDoubleAComponent;
  let fixture: ComponentFixture<EchartBarDoubleAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartBarDoubleAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartBarDoubleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
