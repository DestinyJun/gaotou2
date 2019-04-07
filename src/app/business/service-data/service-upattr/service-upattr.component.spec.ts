import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceUpattrComponent } from './service-upattr.component';

describe('ServiceUpattrComponent', () => {
  let component: ServiceUpattrComponent;
  let fixture: ComponentFixture<ServiceUpattrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceUpattrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceUpattrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
