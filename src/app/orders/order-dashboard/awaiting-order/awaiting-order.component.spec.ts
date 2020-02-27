import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingOrderComponent } from './awaiting-order.component';

describe('AwaitingOrderComponent', () => {
  let component: AwaitingOrderComponent;
  let fixture: ComponentFixture<AwaitingOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwaitingOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
