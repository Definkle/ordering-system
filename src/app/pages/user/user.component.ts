import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Order } from '../../state/models/order.model';
import { removeOrder } from '../../state/orders/orders.action';

@Component({
  selector: 'app-user',
  template: `
    <div class="d-flex flex-column align-items-center justify-content-center">
      <app-order-form [orderForm]="orderForm"></app-order-form>
      <app-orders-list
        [isUser]="true"
        (removeOrder)="onRemoveOrder($event)"
        (updateOrder)="updateFormValue($event)"
      ></app-orders-list>
      <app-logout-button></app-logout-button>
    </div>
  `
})
export class UserComponent implements OnInit {
  fb = inject(FormBuilder);
  orderForm!: FormGroup;
  store = inject(Store);

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Removes an order from the store.
   * @param order - order reference.
   */
  onRemoveOrder(order: Order): void {
    this.store.dispatch(removeOrder({ order }));
  }

  /**
   * Update order form based on provided order.
   * @param order - order reference.
   */
  updateFormValue(order: Order): void {
    this.orderForm.setValue(order);
  }

  /**
   * Initialize order form.
   * @private
   */
  private initForm(): void {
    this.orderForm = this.fb.group({
      id: undefined,
      item: ['', Validators.required],
      status: ''
    });
  }
}
