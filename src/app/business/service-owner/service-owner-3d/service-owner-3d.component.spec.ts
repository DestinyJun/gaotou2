import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOwner3dComponent } from './service-owner-3d.component';

describe('ServiceOwner3dComponent', () => {
  let component: ServiceOwner3dComponent;
  let fixture: ComponentFixture<ServiceOwner3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOwner3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOwner3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
