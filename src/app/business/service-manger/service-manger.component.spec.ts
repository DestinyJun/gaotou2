import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMangerComponent } from './service-manger.component';

describe('ServiceMangerComponent', () => {
  let component: ServiceMangerComponent;
  let fixture: ComponentFixture<ServiceMangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
