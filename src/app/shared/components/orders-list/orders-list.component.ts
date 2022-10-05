import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../../state/models/order.model';
import { selectOrders } from '../../../state/orders/orders.selector';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-orders-list">
      <div class="app-orders-list__container container">
        <div class="row">
          <span class="col d-flex justify-content-center"><h3>Item</h3></span>
          <span class="col-2 d-flex justify-content-center"><h3>Status</h3></span>
          <span class="col-4 d-flex justify-content-center"><h3>Actions</h3></span>
        </div>
        <div class="row" *ngFor="let order of orders$ | async; let i=index">
          <span class="col"><h5>{{order.item}}</h5></span>
          <span class="col-2  d-flex justify-content-center"><h5>{{order.status}}</h5></span>
          <ng-container *ngIf="isUser; else admin">
            <button class="col-2 btn btn-warning" (click)="updateOrder.emit(order)">Edit Order</button>
            <button class="col-2 btn btn-danger" (click)="removeOrder.emit(order)">Remove Order</button>
          </ng-container>
          <ng-template #admin>
            <button class="col-2 btn btn-primary" (click)="acceptOrder.emit(order)">
              Approve Order
            </button>
            <button class="col-2 btn btn-danger" (click)="rejectOrder.emit(order)">
              Reject Order
            </button>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-orders-list {
      &__container {
        min-width: 1100px;
      }
    }
  `]
})
export class OrdersListComponent implements OnInit {
  @Input() isUser!: boolean;
  @Output() updateOrder: EventEmitter<Order> = new EventEmitter();
  @Output() removeOrder: EventEmitter<Order> = new EventEmitter();
  @Output() acceptOrder: EventEmitter<Order> = new EventEmitter();
  @Output() rejectOrder: EventEmitter<Order> = new EventEmitter();
  store = inject(Store);
  orders$!: Observable<readonly Order[]>;

  ngOnInit(): void {
    this.orders$ = this.store.select((selectOrders));
  }
}
