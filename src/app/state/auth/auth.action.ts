import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const setActiveUser = createAction(
  '[User Store] Set Active User',
  props<{ user: User }>()
);

export const setUsers = createAction(
  '[User Store] Set Users',
  props<{ users: User[] }>()
);

export const clearActiveUser = createAction(
  '[User Store] Remove Active User',
);
