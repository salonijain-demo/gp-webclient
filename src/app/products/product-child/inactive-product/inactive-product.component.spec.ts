import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveProductComponent } from './inactive-product.component';

describe('InactiveProductComponent', () => {
  let component: InactiveProductComponent;
  let fixture: ComponentFixture<InactiveProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
