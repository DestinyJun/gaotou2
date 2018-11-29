import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartProvincePersonComponent } from './echart-province-person.component';

describe('EchartProvincePersonComponent', () => {
  let component: EchartProvincePersonComponent;
  let fixture: ComponentFixture<EchartProvincePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartProvincePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartProvincePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
