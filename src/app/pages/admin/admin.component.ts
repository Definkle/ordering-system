import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../state/models/order.model';
import { selectOrders } from '../../state/orders/orders.selector';
import { updateOrder } from '../../state/orders/orders.action';

@Component({
  selector: 'app-admin',
  template: `
    <div *ngFor="let order of orders$ | async; let i=index">
      <span>{{i + 1}}.</span> {{order.item}}
      <ng-container *ngIf="order.status === 'pending'">
        <button class="btn btn-primary" (click)="onAcceptOrder(order)">Accept Order</button>
        <button class="btn btn-danger" (click)="onRejectOrder(order)">Reject Order</button>
      </ng-container>
    </div>
  `
})
export class AdminComponent {
  orders$: Observable<readonly Order[]>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.orders$ = this.store.select((selectOrders));
  }

  onAcceptOrder(order: Order): void {
    this.store.dispatch(updateOrder({ order: { ...order, status: 'accepted' } }));
  }

  onRejectOrder(order: Order): void {
    this.store.dispatch(updateOrder({ order: { ...order, status: 'rejected' } }));
  }
}
