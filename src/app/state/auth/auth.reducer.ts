import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../models/user.model';
import { createReducer, on } from '@ngrx/store';
import { setActiveUser, setUsers } from './auth.action';

export interface AuthState extends EntityState<User> {
  users: User[];
  activeUser: User | undefined
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: AuthState = adapter.getInitialState({
  users: [],
  activeUser: undefined
});
export const authReducer = createReducer(
  initialState,
  on(setActiveUser, (state, { user }): AuthState => {
    return { ...state, activeUser: user };
  }),
  on(setUsers, (state, { users }): AuthState => adapter.upsertMany(users, state))
);
const {
  selectAll,
} = adapter.getSelectors();
export const selectAllUsers = selectAll;
export const selectActiveUser = (state: AuthState) => state.activeUser;
