import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceEvnofficeComponent } from './province-evnoffice.component';

describe('CityEvnofficeComponent', () => {
  let component: ProvinceEvnofficeComponent;
  let fixture: ComponentFixture<ProvinceEvnofficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceEvnofficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceEvnofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
