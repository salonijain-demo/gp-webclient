import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllStoreSettingsComponent } from './show-all-store-settings.component';

describe('ShowAllStoreSettingsComponent', () => {
  let component: ShowAllStoreSettingsComponent;
  let fixture: ComponentFixture<ShowAllStoreSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllStoreSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllStoreSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
