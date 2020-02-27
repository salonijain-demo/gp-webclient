import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatsExportComponent } from './user-stats-export.component';

describe('UserStatsExportComponent', () => {
  let component: UserStatsExportComponent;
  let fixture: ComponentFixture<UserStatsExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStatsExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatsExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
