import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberShowComponent } from './number-show.component';

describe('NumberShowComponent', () => {
  let component: NumberShowComponent;
  let fixture: ComponentFixture<NumberShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
