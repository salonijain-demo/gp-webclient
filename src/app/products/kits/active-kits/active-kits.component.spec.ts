import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveKitsComponent } from './active-kits.component';

describe('ActiveKitsComponent', () => {
  let component: ActiveKitsComponent;
  let fixture: ComponentFixture<ActiveKitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveKitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
