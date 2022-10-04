import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrders from './orders.reducer';

export const selectOrdersState = createFeatureSelector<fromOrders.OrderState>('orders');

export const selectOrders = createSelector(selectOrdersState,
  fromOrders.selectAllOrders
);
