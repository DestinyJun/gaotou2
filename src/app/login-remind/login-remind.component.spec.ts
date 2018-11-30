import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRemindComponent } from './login-remind.component';

describe('LoginRemindComponent', () => {
  let component: LoginRemindComponent;
  let fixture: ComponentFixture<LoginRemindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRemindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRemindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
