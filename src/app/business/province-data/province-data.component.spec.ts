import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceDataComponent } from './province-data.component';

describe('FinanceDataComponent', () => {
  let component: ProvinceDataComponent;
  let fixture: ComponentFixture<ProvinceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
