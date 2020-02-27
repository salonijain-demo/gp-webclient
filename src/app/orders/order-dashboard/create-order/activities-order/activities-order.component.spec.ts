import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesOrderComponent } from './activities-order.component';

describe('ActivitiesOrderComponent', () => {
  let component: ActivitiesOrderComponent;
  let fixture: ComponentFixture<ActivitiesOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
