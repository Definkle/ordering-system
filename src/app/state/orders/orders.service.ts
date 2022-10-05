import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { GeneralTexts } from '../../shared/general-texts.enum';

@Injectable({ providedIn: 'root' })
export class OrdersService {

  /**
   * Get orders from local storage.
   */
  getOrders(): Order[] {
    const storedOrdersRef = localStorage.getItem(GeneralTexts.ORDER);
    return storedOrdersRef !== GeneralTexts.UNDEFINED ? JSON.parse(storedOrdersRef as string) : undefined
  }
}
