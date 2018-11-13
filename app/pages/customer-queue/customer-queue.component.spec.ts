import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerQueueComponent } from './customer-queue.component';

describe('CustomerQueueComponent', () => {
  let component: CustomerQueueComponent;
  let fixture: ComponentFixture<CustomerQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
