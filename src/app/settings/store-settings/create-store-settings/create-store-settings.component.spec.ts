import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreSettingsComponent } from './create-store-settings.component';

describe('CreateStoreSettingsComponent', () => {
  let component: CreateStoreSettingsComponent;
  let fixture: ComponentFixture<CreateStoreSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStoreSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStoreSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
