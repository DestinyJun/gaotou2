import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListInfoComponent } from './event-list-info.component';

describe('EventListInfoComponent', () => {
  let component: EventListInfoComponent;
  let fixture: ComponentFixture<EventListInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
