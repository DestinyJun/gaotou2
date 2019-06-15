import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMangerVideoComponent } from './service-manger-video.component';

describe('ServiceMangerVideoComponent', () => {
  let component: ServiceMangerVideoComponent;
  let fixture: ComponentFixture<ServiceMangerVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMangerVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMangerVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
