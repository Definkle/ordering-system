import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { setActiveUser } from './state/auth/auth.action';
import { GeneralTexts } from './shared/general-texts.enum';

@Injectable({ providedIn: 'root' })
export class AuthResolver implements Resolve<void> {
  constructor(private store: Store) {
  }

  resolve(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== GeneralTexts.UNDEFINED) {
      this.store.dispatch(setActiveUser(JSON.parse(storedUser as string)));
    }
  }
}
