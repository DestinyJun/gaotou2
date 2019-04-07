import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEvnReportComponent } from './service-evn-report.component';

describe('ServiceEvnReportComponent', () => {
  let component: ServiceEvnReportComponent;
  let fixture: ComponentFixture<ServiceEvnReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEvnReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEvnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
