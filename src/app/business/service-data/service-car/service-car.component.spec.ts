import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCarComponent } from './service-car.component';

describe('ServiceCarComponent', () => {
  let component: ServiceCarComponent;
  let fixture: ComponentFixture<ServiceCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
