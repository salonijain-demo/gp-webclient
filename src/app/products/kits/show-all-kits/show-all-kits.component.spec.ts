import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllKitsComponent } from './show-all-kits.component';

describe('ShowAllKitsComponent', () => {
  let component: ShowAllKitsComponent;
  let fixture: ComponentFixture<ShowAllKitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllKitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
