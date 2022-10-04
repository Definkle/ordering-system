import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectOrders } from '../../state/orders/orders.selector';
import { Observable } from 'rxjs';
import { Order } from '../../state/models/order.model';
import { updateOrder } from '../../state/orders/orders.action';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
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
