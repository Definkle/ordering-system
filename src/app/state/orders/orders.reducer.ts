import { createReducer, on } from '@ngrx/store';

import { addOrder, loadOrders, removeOrder, updateOrder } from './orders.action';
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
  on(removeOrder, (state, { order }) => adapter.removeOne(order.id, state)),
  on(addOrder, (state, { order }) => {
    const lastOrderId: number = +state.ids[state.ids.length - 1];
    const newOrder = { ...order, id: Number.isInteger(lastOrderId) ? lastOrderId + 1 : 0 };
    return adapter.addOne(newOrder, state);
  }),
  on(updateOrder, (state, { order }) => adapter.setOne(order, state)),
  on(loadOrders, (state, { orders }) => adapter.setMany(orders, state))
);


const {
  selectAll,
} = adapter.getSelectors();

export const selectAllOrders = selectAll;
