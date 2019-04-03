import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIncomeComponent } from './province-income.component';

describe('CityIncomeComponent', () => {
  let component: ServiceIncomeComponent;
  let fixture: ComponentFixture<ServiceIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
