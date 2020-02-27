import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveRecountInventoryComponent } from './receive-recount-inventory.component';

describe('ReceiveRecountInventoryComponent', () => {
  let component: ReceiveRecountInventoryComponent;
  let fixture: ComponentFixture<ReceiveRecountInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveRecountInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveRecountInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
