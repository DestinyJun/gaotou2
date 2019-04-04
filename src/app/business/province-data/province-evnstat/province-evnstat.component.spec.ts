import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceEvnstatComponent } from './province-evnstat.component';

describe('ProvinceEvnstatComponent', () => {
  let component: ProvinceEvnstatComponent;
  let fixture: ComponentFixture<ProvinceEvnstatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceEvnstatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceEvnstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
