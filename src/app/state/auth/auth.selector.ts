import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './auth.reducer';
import { User } from '../models/user.model';
import { find } from 'lodash-es';
import { GeneralTexts } from '../../shared/enums/general-texts.enum';

export const selectAuthState = createFeatureSelector<fromUsers.AuthState>(GeneralTexts.USER);

export const selectActiveUser = createSelector(selectAuthState,
  fromUsers.selectActiveUser);
export const selectAllUsers = createSelector(selectAuthState, fromUsers.selectAllUsers);
export const selectByUser = (user: User) => createSelector(selectAllUsers, (users) => find(users, user));
