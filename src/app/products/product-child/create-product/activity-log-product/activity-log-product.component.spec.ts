import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogProductComponent } from './activity-log-product.component';

describe('ActivityLogProductComponent', () => {
  let component: ActivityLogProductComponent;
  let fixture: ComponentFixture<ActivityLogProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLogProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
