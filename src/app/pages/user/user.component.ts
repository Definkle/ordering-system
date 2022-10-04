import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../state/models/order.model';
import { selectOrders } from '../../state/orders/orders.selector';
import { addOrder, removeOrder, updateOrder } from '../../state/orders/orders.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
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

  onAddOrder(item: string): void {
    if (this.orderForm.valid) {
      this.store.dispatch(addOrder({ order: { id: Math.random(), item, status: 'pending' } }));
      this.orderForm.reset();
    }
  }

  onRemoveOrder(order: Order): void {
    this.store.dispatch(removeOrder({ order }));
  }

  onUpdateOrder(order: Order): void {
    this.orderForm.setValue(order);
  }

  updateOrder(order: Order): void {
    this.store.dispatch(updateOrder({ order }));
    this.orderForm.reset();
  }
}
