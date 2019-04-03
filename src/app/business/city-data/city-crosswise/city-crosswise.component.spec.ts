import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCrosswiseComponent } from './city-crosswise.component';

describe('CityCrosswiseComponent', () => {
  let component: CityCrosswiseComponent;
  let fixture: ComponentFixture<CityCrosswiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityCrosswiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCrosswiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
