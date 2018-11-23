import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartBasicbarComponent } from './echart-basicbar.component';

describe('EchartBasicbarComponent', () => {
  let component: EchartBasicbarComponent;
  let fixture: ComponentFixture<EchartBasicbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartBasicbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartBasicbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
