import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../state/models/order.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <div class="row justify-content-between">
        <h3 class="col-5">Item</h3>
        <h3 class="col">Status</h3>
        <h3 class="col-2">Actions</h3>
      </div>
      <div class="row justify-content-between" *ngFor="let order of orders$ | async; let i=index">
        <h5 class="col-5">{{order.item}}</h5>
        <h5 class="col">{{order.status}}</h5>
        <ng-container *ngIf="isUser; else admin">
          <button class="col-2 btn btn-warning" (click)="updateOrder.emit(order)">Update Order</button>
          <button class="col-2 btn btn-danger" (click)="removeOrder.emit(order)">Remove Order</button>
        </ng-container>
        <ng-template #admin>
          <ng-container *ngIf="order.status === 'pending'">
            <button class="col-2 btn btn-primary" (click)="acceptOrder.emit(order)">Accept Order</button>
            <button class="col-2 btn btn-danger" (click)="rejectOrder.emit(order)">Reject Order</button>
          </ng-container>
        </ng-template>
      </div>
    </div>
  `,
})
export class OrdersListComponent {
  @Input() orders$!: Observable<readonly Order[]>;
  @Input() isUser!: boolean;
  @Output() updateOrder: EventEmitter<Order> = new EventEmitter();
  @Output() removeOrder: EventEmitter<Order> = new EventEmitter();
  @Output() acceptOrder: EventEmitter<Order> = new EventEmitter();
  @Output() rejectOrder: EventEmitter<Order> = new EventEmitter();
}
