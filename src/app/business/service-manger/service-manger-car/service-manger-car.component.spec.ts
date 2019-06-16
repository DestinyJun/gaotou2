import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMangerCarComponent } from './service-manger-car.component';

describe('ServiceMangerCarComponent', () => {
  let component: ServiceMangerCarComponent;
  let fixture: ComponentFixture<ServiceMangerCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMangerCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMangerCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
