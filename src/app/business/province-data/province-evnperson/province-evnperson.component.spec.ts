import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceEvnpersonComponent } from './province-evnperson.component';

describe('CityEvnpersonComponent', () => {
  let component: ProvinceEvnpersonComponent;
  let fixture: ComponentFixture<ProvinceEvnpersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceEvnpersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceEvnpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
