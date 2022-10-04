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
      <div class="row justify-content-between" *ngFor="let order of orders$ | async; let i=index">
        <p class="col-5">{{order.item}}</p>
        <p class="col">{{order.status}}</p>
        <ng-container *ngIf="order.status === 'pending'">
          <button class="col btn btn-warning" (click)="updateOrder.emit(order)">Update Order</button>
          <button class="col btn btn-danger" (click)="removeOrder.emit(order)">Remove Order</button>
        </ng-container>
      </div>
    </div>
  `,
})
export class OrdersListComponent {
  @Input() orders$!: Observable<readonly Order[]>;
  @Output() updateOrder: EventEmitter<Order> = new EventEmitter();
  @Output() removeOrder: EventEmitter<Order> = new EventEmitter();
}
