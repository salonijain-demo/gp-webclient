import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoCreateComponent } from './product-info-create.component';

describe('ProductInfoCreateComponent', () => {
  let component: ProductInfoCreateComponent;
  let fixture: ComponentFixture<ProductInfoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
