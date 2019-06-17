import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOwnerCarComponent } from './service-owner-car.component';

describe('ServiceMangerCarComponent', () => {
  let component: ServiceOwnerCarComponent;
  let fixture: ComponentFixture<ServiceOwnerCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOwnerCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOwnerCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
