import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPreferenceComponent } from './general-preference.component';

describe('GeneralPreferenceComponent', () => {
  let component: GeneralPreferenceComponent;
  let fixture: ComponentFixture<GeneralPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
