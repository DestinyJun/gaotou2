import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityEvnpersonComponent } from './city-evnperson.component';

describe('CityEvnpersonComponent', () => {
  let component: CityEvnpersonComponent;
  let fixture: ComponentFixture<CityEvnpersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityEvnpersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityEvnpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
