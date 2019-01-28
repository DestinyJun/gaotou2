import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceEventComponent } from './province-event.component';

describe('ProvinceEventComponent', () => {
  let component: ProvinceEventComponent;
  let fixture: ComponentFixture<ProvinceEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
