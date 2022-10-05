import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadOrders } from '../state/orders/orders.action';
import { GeneralTexts } from '../shared/enums/general-texts.enum';
import { Order } from '../state/models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderResolver implements Resolve<Order[] | undefined> {
  constructor(private store: Store) {
  }

  /**
   * Sets orders from local storage.
   */
  resolve(): Order[] | undefined {
    const storedOrders = localStorage.getItem(GeneralTexts.ORDER);
    if (storedOrders !== GeneralTexts.UNDEFINED && Boolean(storedOrders)) {
      this.store.dispatch(loadOrders({ orders: JSON.parse(storedOrders as string) }));
    }
    return JSON.parse(storedOrders as string);
  }
}
