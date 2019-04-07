import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEvnDealComponent } from './service-evn-deal.component';

describe('ServiceEvnDealComponent', () => {
  let component: ServiceEvnDealComponent;
  let fixture: ComponentFixture<ServiceEvnDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEvnDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEvnDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
