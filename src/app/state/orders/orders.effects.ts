import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { addOrder, removeOrder, updateOrder } from './orders.action';
import { Order } from '../models/order.model';
import { OrdersService } from './orders.service';
import { GeneralTexts } from '../../shared/general-texts.enum';

@Injectable()
export class OrderEffects {
  addOrder$ = createEffect(() => {
      return this.actions$
      .pipe(
        ofType(addOrder),
        tap((action) =>
          localStorage.setItem(GeneralTexts.ORDER,
            JSON.stringify(this.addToLocalStorage(action.order)))
        )
      )
    }
    ,
    { dispatch: false });

  updateOrder$ = createEffect(() => {
      return this.actions$
      .pipe(
        ofType(updateOrder),
        tap((action) =>
          localStorage.setItem(GeneralTexts.ORDER,
            JSON.stringify(this.updateInLocalStorage(action.order)))
        )
      )
    }
    ,
    { dispatch: false });

  removeOrder$ = createEffect(() => {
      return this.actions$
      .pipe(
        ofType(removeOrder),
        tap((action) =>
          localStorage.setItem(GeneralTexts.ORDER,
            JSON.stringify(this.removeFromLocalStorage(action.order)))
        )
      )
    }
    ,
    { dispatch: false });

  constructor(private actions$: Actions, private ordersService: OrdersService) {
  }

  /**
   * Adds order to local storage, and returns the modified local storage.
   * @param order - order reference.
   * @private
   */
  private addToLocalStorage(order: Order): Order[] {
    const storedOrders = this.ordersService.getOrders();
    if (storedOrders) {
      const lastOrder = storedOrders[storedOrders.length - 1];
      const newOrder = Number.isInteger(order.id) ? order : {
        ...order,
        id: Boolean(lastOrder) ? lastOrder.id + 1 : 0
      };
      return [...storedOrders, newOrder];
    }
    return [{ ...order, id: 0 }];
  }

  /**
   * Updates an order in the local storage, and returns the modified local storage.
   * @param order - order reference.
   * @private
   */
  private updateInLocalStorage(order: Order): Order[] {
    const storedOrders = this.ordersService.getOrders();
    return storedOrders.map((storedOrder) => storedOrder.id === order.id ? order : storedOrder);
  }

  /**
   * Removes an order from the local storage, and returns the modified local storage.
   * @param order - order reference.
   * @private
   */
  private removeFromLocalStorage(order: Order): Order[] {
    const storedOrdersRef = localStorage.getItem(GeneralTexts.ORDER);
    const storedOrders: Order[] | undefined = storedOrdersRef !== GeneralTexts.UNDEFINED ? JSON.parse(storedOrdersRef as string) : undefined;
    if (storedOrders) {
      return storedOrders.filter((storedOrder) => storedOrder.id !== order.id);
    }
    return [order];
  }
}
