import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMangerUpattrComponent } from './service-manger-upattr.component';

describe('ServiceMangerUpattrComponent', () => {
  let component: ServiceMangerUpattrComponent;
  let fixture: ComponentFixture<ServiceMangerUpattrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMangerUpattrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMangerUpattrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
