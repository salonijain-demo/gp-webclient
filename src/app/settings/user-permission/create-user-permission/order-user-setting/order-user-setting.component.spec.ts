import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUserSettingComponent } from './order-user-setting.component';

describe('OrderUserSettingComponent', () => {
  let component: OrderUserSettingComponent;
  let fixture: ComponentFixture<OrderUserSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUserSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
