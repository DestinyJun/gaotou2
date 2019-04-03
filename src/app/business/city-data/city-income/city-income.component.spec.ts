import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityIncomeComponent } from './city-income.component';

describe('CityIncomeComponent', () => {
  let component: CityIncomeComponent;
  let fixture: ComponentFixture<CityIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
