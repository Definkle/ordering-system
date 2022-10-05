import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../state/models/order.model';
import { selectOrders } from '../../state/orders/orders.selector';
import { updateOrder } from '../../state/orders/orders.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  template: `
    <div class="container">
      <div class="row">
        <app-logout-button></app-logout-button>
        <app-orders-list
          [orders$]="orders$"
          [isUser]="false"
          (acceptOrder)="onAcceptOrder($event)"
          (rejectOrder)="onRejectOrder($event)"
        ></app-orders-list>
      </div>
    </div>
  `
})
export class AdminComponent {
  router = inject(Router);
  orders$: Observable<readonly Order[]>;

  constructor(private store: Store) {
    this.orders$ = this.store.select((selectOrders));
  }

  onAcceptOrder(order: Order): void {
    this.store.dispatch(updateOrder({ order: { ...order, status: 'accepted' } }));
  }

  onRejectOrder(order: Order): void {
    this.store.dispatch(updateOrder({ order: { ...order, status: 'rejected' } }));
  }

}
