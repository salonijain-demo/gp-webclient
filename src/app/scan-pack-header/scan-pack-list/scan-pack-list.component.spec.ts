import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPackListComponent } from './scan-pack-list.component';

describe('ScanPackListComponent', () => {
  let component: ScanPackListComponent;
  let fixture: ComponentFixture<ScanPackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
