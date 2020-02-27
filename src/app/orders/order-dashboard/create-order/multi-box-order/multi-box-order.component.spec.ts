import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiBoxOrderComponent } from './multi-box-order.component';

describe('MultiBoxOrderComponent', () => {
  let component: MultiBoxOrderComponent;
  let fixture: ComponentFixture<MultiBoxOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiBoxOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiBoxOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
