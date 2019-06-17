import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOwnerInfoComponent } from './service-owner-info.component';

describe('ServiceOwnerInfoComponent', () => {
  let component: ServiceOwnerInfoComponent;
  let fixture: ComponentFixture<ServiceOwnerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOwnerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
