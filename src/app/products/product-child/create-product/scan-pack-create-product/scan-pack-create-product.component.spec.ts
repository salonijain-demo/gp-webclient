import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPackCreateProductComponent } from './scan-pack-create-product.component';

describe('ScanPackCreateProductComponent', () => {
  let component: ScanPackCreateProductComponent;
  let fixture: ComponentFixture<ScanPackCreateProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPackCreateProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPackCreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
