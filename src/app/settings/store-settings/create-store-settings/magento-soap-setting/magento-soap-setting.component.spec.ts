import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagentoSoapSettingComponent } from './magento-soap-setting.component';

describe('MagentoSoapSettingComponent', () => {
  let component: MagentoSoapSettingComponent;
  let fixture: ComponentFixture<MagentoSoapSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagentoSoapSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagentoSoapSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
