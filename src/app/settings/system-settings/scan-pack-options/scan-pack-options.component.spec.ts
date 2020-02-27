import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPackOptionsComponent } from './scan-pack-options.component';

describe('ScanPackOptionsComponent', () => {
  let component: ScanPackOptionsComponent;
  let fixture: ComponentFixture<ScanPackOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPackOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPackOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
