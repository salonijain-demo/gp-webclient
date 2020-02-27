import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserPermissionComponent } from './create-user-permission.component';

describe('CreateUserPermissionComponent', () => {
  let component: CreateUserPermissionComponent;
  let fixture: ComponentFixture<CreateUserPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
