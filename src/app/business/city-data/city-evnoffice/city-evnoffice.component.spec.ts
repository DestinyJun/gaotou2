import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityEvnofficeComponent } from './city-evnoffice.component';

describe('CityEvnofficeComponent', () => {
  let component: CityEvnofficeComponent;
  let fixture: ComponentFixture<CityEvnofficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityEvnofficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityEvnofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
