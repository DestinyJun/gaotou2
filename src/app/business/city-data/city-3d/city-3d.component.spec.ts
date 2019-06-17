import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { City3dComponent } from './city-3d.component';

describe('ServiceOwner3dComponent', () => {
  let component: City3dComponent;
  let fixture: ComponentFixture<City3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ City3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(City3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
