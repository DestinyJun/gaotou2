import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Service3dComponent } from './service-3d.component';

describe('ServiceOwner3dComponent', () => {
  let component: Service3dComponent;
  let fixture: ComponentFixture<Service3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Service3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Service3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
