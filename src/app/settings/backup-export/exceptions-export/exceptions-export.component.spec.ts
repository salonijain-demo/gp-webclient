import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionsExportComponent } from './exceptions-export.component';

describe('ExceptionsExportComponent', () => {
  let component: ExceptionsExportComponent;
  let fixture: ComponentFixture<ExceptionsExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionsExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionsExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
