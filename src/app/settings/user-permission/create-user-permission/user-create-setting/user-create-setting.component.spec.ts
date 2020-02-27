import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateSettingComponent } from './user-create-setting.component';

describe('UserCreateSettingComponent', () => {
  let component: UserCreateSettingComponent;
  let fixture: ComponentFixture<UserCreateSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
