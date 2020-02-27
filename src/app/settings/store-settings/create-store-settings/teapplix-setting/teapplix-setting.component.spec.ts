import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeapplixSettingComponent } from './teapplix-setting.component';

describe('TeapplixSettingComponent', () => {
  let component: TeapplixSettingComponent;
  let fixture: ComponentFixture<TeapplixSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeapplixSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeapplixSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
