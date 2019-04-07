import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDownattrComponent } from './service-downattr.component';

describe('ServiceDownattrComponent', () => {
  let component: ServiceDownattrComponent;
  let fixture: ComponentFixture<ServiceDownattrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDownattrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDownattrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
