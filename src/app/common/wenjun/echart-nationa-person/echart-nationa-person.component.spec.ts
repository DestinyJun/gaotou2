import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartNationaPersonComponent } from './echart-nationa-person.component';

describe('EchartNationaPersonComponent', () => {
  let component: EchartNationaPersonComponent;
  let fixture: ComponentFixture<EchartNationaPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartNationaPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartNationaPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
