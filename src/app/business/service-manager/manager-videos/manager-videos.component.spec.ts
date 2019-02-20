import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerVideosComponent } from './manager-videos.component';

describe('ManagerVideosComponent', () => {
  let component: ManagerVideosComponent;
  let fixture: ComponentFixture<ManagerVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
