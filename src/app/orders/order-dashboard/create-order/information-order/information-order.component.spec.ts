import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationOrderComponent } from './information-order.component';

describe('InformationOrderComponent', () => {
  let component: InformationOrderComponent;
  let fixture: ComponentFixture<InformationOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
