import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesOrderComponent } from './notes-order.component';

describe('NotesOrderComponent', () => {
  let component: NotesOrderComponent;
  let fixture: ComponentFixture<NotesOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
