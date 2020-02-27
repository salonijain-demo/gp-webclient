import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipworkSettingComponent } from './shipwork-setting.component';

describe('ShipworkSettingComponent', () => {
  let component: ShipworkSettingComponent;
  let fixture: ComponentFixture<ShipworkSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipworkSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipworkSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
