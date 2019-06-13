import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningEventListComponent } from './warning-event-list.component';

describe('WarningEventListComponent', () => {
  let component: WarningEventListComponent;
  let fixture: ComponentFixture<WarningEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
