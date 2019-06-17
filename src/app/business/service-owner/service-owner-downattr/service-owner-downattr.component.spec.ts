import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOwnerDownattrComponent } from './service-owner-downattr.component';

describe('ServiceOwnerDownattrComponent', () => {
  let component: ServiceOwnerDownattrComponent;
  let fixture: ComponentFixture<ServiceOwnerDownattrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOwnerDownattrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOwnerDownattrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
