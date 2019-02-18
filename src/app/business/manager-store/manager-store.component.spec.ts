import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStoreComponent } from './manager-store.component';

describe('ManagerStoreComponent', () => {
  let component: ManagerStoreComponent;
  let fixture: ComponentFixture<ManagerStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
