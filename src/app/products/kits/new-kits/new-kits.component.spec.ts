import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKitsComponent } from './new-kits.component';

describe('NewKitsComponent', () => {
  let component: NewKitsComponent;
  let fixture: ComponentFixture<NewKitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewKitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
