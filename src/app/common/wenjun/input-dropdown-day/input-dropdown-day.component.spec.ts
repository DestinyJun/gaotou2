import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDropdownDayComponent } from './input-dropdown-day.component';

describe('InputDropdownDayComponent', () => {
  let component: InputDropdownDayComponent;
  let fixture: ComponentFixture<InputDropdownDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDropdownDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDropdownDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
