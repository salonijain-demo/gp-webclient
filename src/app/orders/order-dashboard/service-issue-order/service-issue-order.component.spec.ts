import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIssueOrderComponent } from './service-issue-order.component';

describe('ServiceIssueOrderComponent', () => {
  let component: ServiceIssueOrderComponent;
  let fixture: ComponentFixture<ServiceIssueOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceIssueOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceIssueOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
