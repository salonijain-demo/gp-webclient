import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPackProductEditComponent } from './scan-pack-product-edit.component';

describe('ScanPackProductEditComponent', () => {
  let component: ScanPackProductEditComponent;
  let fixture: ComponentFixture<ScanPackProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPackProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPackProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
