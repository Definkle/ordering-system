import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUsers } from '../state/auth/auth.action';
import { MockUsersData } from '../shared/mock-users.data';

@Injectable({ providedIn: 'root' })
export class UsersResolver implements Resolve<void> {
  constructor(private store: Store) {
  }

  /**
   * Add users to ngrx user store.
   */
  resolve(): void {
    this.store.dispatch(setUsers({ users: MockUsersData }));
  }
}
