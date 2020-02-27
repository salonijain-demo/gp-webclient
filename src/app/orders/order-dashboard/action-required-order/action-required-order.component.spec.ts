import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRequiredOrderComponent } from './action-required-order.component';

describe('ActionRequiredOrderComponent', () => {
  let component: ActionRequiredOrderComponent;
  let fixture: ComponentFixture<ActionRequiredOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionRequiredOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRequiredOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
