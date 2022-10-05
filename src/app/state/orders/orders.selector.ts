import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';
import * as fromOrders from './orders.reducer';

export const selectOrdersState = createFeatureSelector<fromOrders.OrderState>(GeneralTexts.ORDER);

export const selectOrders = createSelector(selectOrdersState,
  fromOrders.selectOrders
);
