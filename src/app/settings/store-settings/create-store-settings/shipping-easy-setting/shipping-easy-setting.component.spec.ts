import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingEasySettingComponent } from './shipping-easy-setting.component';

describe('ShippingEasySettingComponent', () => {
  let component: ShippingEasySettingComponent;
  let fixture: ComponentFixture<ShippingEasySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingEasySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingEasySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
