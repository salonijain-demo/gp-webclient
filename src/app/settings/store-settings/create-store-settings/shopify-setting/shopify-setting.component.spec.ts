import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifySettingComponent } from './shopify-setting.component';

describe('ShopifySettingComponent', () => {
  let component: ShopifySettingComponent;
  let fixture: ComponentFixture<ShopifySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopifySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
