import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUserSettingComponent } from './system-user-setting.component';

describe('SystemUserSettingComponent', () => {
  let component: SystemUserSettingComponent;
  let fixture: ComponentFixture<SystemUserSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemUserSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
