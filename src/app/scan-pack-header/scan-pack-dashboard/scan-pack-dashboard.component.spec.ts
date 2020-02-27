import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPackDashboardComponent } from './scan-pack-dashboard.component';

describe('ScanPackDashboardComponent', () => {
  let component: ScanPackDashboardComponent;
  let fixture: ComponentFixture<ScanPackDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPackDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPackDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
