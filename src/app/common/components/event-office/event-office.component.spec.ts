import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOfficeComponent } from './event-office.component';

describe('EventOfficeComponent', () => {
  let component: EventOfficeComponent;
  let fixture: ComponentFixture<EventOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
