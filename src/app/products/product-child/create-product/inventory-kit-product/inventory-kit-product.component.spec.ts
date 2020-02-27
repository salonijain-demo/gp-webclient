import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryKitProductComponent } from './inventory-kit-product.component';

describe('InventoryKitProductComponent', () => {
  let component: InventoryKitProductComponent;
  let fixture: ComponentFixture<InventoryKitProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryKitProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryKitProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
