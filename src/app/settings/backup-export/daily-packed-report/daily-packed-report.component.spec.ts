import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPackedReportComponent } from './daily-packed-report.component';

describe('DailyPackedReportComponent', () => {
  let component: DailyPackedReportComponent;
  let fixture: ComponentFixture<DailyPackedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyPackedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyPackedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
