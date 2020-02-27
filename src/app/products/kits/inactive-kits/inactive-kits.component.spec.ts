import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveKitsComponent } from './inactive-kits.component';

describe('InactiveKitsComponent', () => {
  let component: InactiveKitsComponent;
  let fixture: ComponentFixture<InactiveKitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveKitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
