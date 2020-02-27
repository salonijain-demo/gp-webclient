import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagentoRestSettingComponent } from './magento-rest-setting.component';

describe('MagentoRestSettingComponent', () => {
  let component: MagentoRestSettingComponent;
  let fixture: ComponentFixture<MagentoRestSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagentoRestSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagentoRestSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
