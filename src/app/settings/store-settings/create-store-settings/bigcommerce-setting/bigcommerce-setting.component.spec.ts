import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigcommerceSettingComponent } from './bigcommerce-setting.component';

describe('BigcommerceSettingComponent', () => {
  let component: BigcommerceSettingComponent;
  let fixture: ComponentFixture<BigcommerceSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigcommerceSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigcommerceSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
