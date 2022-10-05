import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../state/models/order.model';
import { selectOrders } from '../../state/orders/orders.selector';
import { removeOrder } from '../../state/orders/orders.action';

@Component({
  selector: 'app-user',
  template: `
    <div class="d-flex flex-column align-items-center justify-content-center">
      <app-order-form [orderForm]="orderForm"></app-order-form>
      <app-orders-list
        [orders$]="orders$"
        [isUser]="true"
        (removeOrder)="onRemoveOrder($event)"
        (updateOrder)="updateFormValue($event)"
      ></app-orders-list>
    </div>
  `
})
export class UserComponent implements OnInit {
  fb = inject(FormBuilder);
  orders$!: Observable<readonly Order[]>;
  orderForm!: FormGroup;
  store = inject(Store);

  ngOnInit(): void {
    this.orders$ = this.store.select((selectOrders));
    this.orderForm = this.fb.group({
      id: undefined,
      item: ['', Validators.required],
      status: ''
    });
  }

  onRemoveOrder(order: Order): void {
    this.store.dispatch(removeOrder({ order }));
  }

  updateFormValue(order: Order): void {
    this.orderForm.setValue(order);
  }
}
