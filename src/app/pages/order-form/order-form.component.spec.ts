import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormComponent } from './order-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFormComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [FormBuilder, provideMockStore({})]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    component.orderForm = component.fb.group({
      id: undefined,
      item: ['', Validators.required],
      status: ''
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
