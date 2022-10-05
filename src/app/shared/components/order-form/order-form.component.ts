import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addOrder, updateOrder } from '../../../state/orders/orders.action';
import { Order } from '../../../state/models/order.model';
import { GeneralTexts } from '../../general-texts.enum';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LogoutButtonComponent],
  template: `
    <div class="row card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title">Order Form</h5>
          <app-logout-button></app-logout-button>
        </div>
        <form [formGroup]="orderForm" (keyup.enter)="buttonOperation">
          <label for="itemInput">Item</label>
          <input type="text" class="form-control" placeholder="" id="itemInput" formControlName="item">
        </form>

        <button class="btn btn-primary mt-2" (click)="buttonOperation">{{buttonText}}</button>
      </div>
    </div>
  `
})
export class OrderFormComponent {
  @Input() orderForm!: FormGroup;
  fb = inject(FormBuilder);
  store = inject(Store);

  get buttonOperation(): void {
    return this.orderForm.value.status ? this.onUpdateOrder(this.orderForm.value) : this.onAddOrder(this.orderForm.value.item);
  }

  get buttonText(): string {
    return this.orderForm.value.status ? GeneralTexts.UPDATE : GeneralTexts.ORDER;
  }

  onAddOrder(item: string): void {
    if (this.orderForm.valid) {
      this.store.dispatch(addOrder({ order: { id: Math.random(), item, status: GeneralTexts.PENDING } }));
      this.orderForm.reset();
    }
  }

  onUpdateOrder(order: Order): void {
    this.store.dispatch(updateOrder({ order }));
    this.orderForm.reset();
  }
}
