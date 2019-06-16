import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceCarComponent } from './province-car.component';

describe('ServiceMangerCarComponent', () => {
  let component: ProvinceCarComponent;
  let fixture: ComponentFixture<ProvinceCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
