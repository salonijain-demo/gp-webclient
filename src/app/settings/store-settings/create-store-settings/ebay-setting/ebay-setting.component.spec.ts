import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbaySettingComponent } from './ebay-setting.component';

describe('EbaySettingComponent', () => {
  let component: EbaySettingComponent;
  let fixture: ComponentFixture<EbaySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbaySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbaySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
