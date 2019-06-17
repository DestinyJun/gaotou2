import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOwnerUpattrComponent } from './service-owner-upattr.component';

describe('ServiceMangerUpattrComponent', () => {
  let component: ServiceOwnerUpattrComponent;
  let fixture: ComponentFixture<ServiceOwnerUpattrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOwnerUpattrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOwnerUpattrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
