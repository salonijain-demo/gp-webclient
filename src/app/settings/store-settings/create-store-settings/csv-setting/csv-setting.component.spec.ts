import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvSettingComponent } from './csv-setting.component';

describe('CsvSettingComponent', () => {
  let component: CsvSettingComponent;
  let fixture: ComponentFixture<CsvSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
