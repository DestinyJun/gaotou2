import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceCrosswiseComponent } from './province-crosswise.component';

describe('ProvinceCrosswiseComponent', () => {
  let component: ProvinceCrosswiseComponent;
  let fixture: ComponentFixture<ProvinceCrosswiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceCrosswiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceCrosswiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
