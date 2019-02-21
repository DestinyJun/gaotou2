import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSerinfoComponent } from './manager-serinfo.component';

describe('ManagerSerinfoComponent', () => {
  let component: ManagerSerinfoComponent;
  let fixture: ComponentFixture<ManagerSerinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSerinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSerinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
