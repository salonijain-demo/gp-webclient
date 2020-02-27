import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoSettingComponent } from './user-info-setting.component';

describe('UserInfoSettingComponent', () => {
  let component: UserInfoSettingComponent;
  let fixture: ComponentFixture<UserInfoSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
