import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedOrderComponent } from './scanned-order.component';

describe('ScannedOrderComponent', () => {
  let component: ScannedOrderComponent;
  let fixture: ComponentFixture<ScannedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
