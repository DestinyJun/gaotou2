import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceToiletComponent } from './service-toilet.component';

describe('ServiceToiletComponent', () => {
  let component: ServiceToiletComponent;
  let fixture: ComponentFixture<ServiceToiletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceToiletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceToiletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
