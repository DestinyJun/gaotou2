import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleOneComponent } from './title-one.component';

describe('TitleOneComponent', () => {
  let component: TitleOneComponent;
  let fixture: ComponentFixture<TitleOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
