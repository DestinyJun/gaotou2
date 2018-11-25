import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPersonComponent } from './event-person.component';

describe('EventPersonComponent', () => {
  let component: EventPersonComponent;
  let fixture: ComponentFixture<EventPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
