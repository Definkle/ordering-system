import { createReducer, on } from '@ngrx/store';

import { addOrder, removeOrder, updateOrder } from './orders.action';
import { Order } from '../models/order.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface OrderState extends EntityState<Order> {
  orders: Order[];
  activeOrder: number | null;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();
export const initialState: OrderState = adapter.getInitialState({
  orders: [],
  activeOrder: null,
});
export const ordersReducer = createReducer(
  initialState,
  on(removeOrder, (state, { order }) => adapter.removeOne(+order.id!, state)),
  on(addOrder, (state, { order }) => adapter.addOne(order, state)),
  on(updateOrder, (state, { order }) => adapter.updateOne({ id: +order.id!, changes: order }, state))
);


const {
  selectAll,
} = adapter.getSelectors();

export const selectAllOrders = selectAll;
