import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUserSettingComponent } from './product-user-setting.component';

describe('ProductUserSettingComponent', () => {
  let component: ProductUserSettingComponent;
  let fixture: ComponentFixture<ProductUserSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUserSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
