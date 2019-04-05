import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityEvnstatComponent } from './city-evnstat.component';

describe('CityEvnstatComponent', () => {
  let component: CityEvnstatComponent;
  let fixture: ComponentFixture<CityEvnstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityEvnstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityEvnstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
