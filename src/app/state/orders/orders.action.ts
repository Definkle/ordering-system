import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/state/models/order.model';

export const addOrder = createAction(
  '[Order Store] Add Order',
  props<{ order: Order }>()
);

export const removeOrder = createAction(
  '[Order Store] Remove Order',
  props<{ order: Order }>()
);

export const updateOrder = createAction(
  '[Order Store] Update Order',
  props<{ order: Order }>()
);
