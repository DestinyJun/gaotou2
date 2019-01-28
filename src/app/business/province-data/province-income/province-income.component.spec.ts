import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceIncomeComponent } from './province-income.component';

describe('ProvinceIncomeComponent', () => {
  let component: ProvinceIncomeComponent;
  let fixture: ComponentFixture<ProvinceIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
