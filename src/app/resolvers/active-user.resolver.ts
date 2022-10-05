import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { setActiveUser } from '../state/auth/auth.action';
import { GeneralTexts } from '../shared/enums/general-texts.enum';
import { User } from '../state/models/user.model';

@Injectable({ providedIn: 'root' })
export class ActiveUserResolver implements Resolve<User | undefined> {
  constructor(private store: Store) {
  }

  /**
   * Set active user if user exists in local storage.
   */
  resolve(): User | undefined {
    const storedUser = localStorage.getItem(GeneralTexts.USER);
    if (storedUser !== GeneralTexts.UNDEFINED && Boolean(storedUser)) {
      this.store.dispatch(setActiveUser(JSON.parse(storedUser as string)));
    }
    return JSON.parse(storedUser as string);
  }
}
