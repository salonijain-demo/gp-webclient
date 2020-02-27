import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllUserPermissionComponent } from './show-all-user-permission.component';

describe('ShowAllUserPermissionComponent', () => {
  let component: ShowAllUserPermissionComponent;
  let fixture: ComponentFixture<ShowAllUserPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllUserPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllUserPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
