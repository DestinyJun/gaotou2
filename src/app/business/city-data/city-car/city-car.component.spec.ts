import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCarComponent } from './city-car.component';

describe('ServiceMangerCarComponent', () => {
  let component: CityCarComponent;
  let fixture: ComponentFixture<CityCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
