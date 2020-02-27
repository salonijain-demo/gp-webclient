import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipstationApiSettingComponent } from './shipstation-api-setting.component';

describe('ShipstationApiSettingComponent', () => {
  let component: ShipstationApiSettingComponent;
  let fixture: ComponentFixture<ShipstationApiSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipstationApiSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipstationApiSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
