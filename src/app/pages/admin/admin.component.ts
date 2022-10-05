import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from '../../state/models/order.model';
import { updateOrder } from '../../state/orders/orders.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  template: `
    <div class="container">
      <div class="d-flex flex-column">
        <app-orders-list
          [isUser]="false"
          (acceptOrder)="onAcceptOrder($event)"
          (rejectOrder)="onRejectOrder($event)"
        ></app-orders-list>
        <div class="d-flex justify-content-center">
          <app-logout-button></app-logout-button>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent {
  router = inject(Router);
  store = inject(Store);

  /**
   * Updates an order's status to accepted.
   * @param order
   */
  onAcceptOrder(order: Order): void {
    this.store.dispatch(updateOrder({ order: { ...order, status: 'approved' } }));
  }

  /**
   * Updates an order's status to rejected.
   * @param order
   */
  onRejectOrder(order: Order): void {
    this.store.dispatch(updateOrder({ order: { ...order, status: 'rejected' } }));
  }

}
