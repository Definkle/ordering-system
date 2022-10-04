import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { clearActiveUser, setActiveUser } from './auth.action';

@Injectable()
export class AuthEffects {
  router = inject(Router);
  login$ = createEffect(() => {
      return this.actions$
      .pipe(
        ofType(setActiveUser),
        tap(action => localStorage.setItem('user',
          JSON.stringify(action.user))
        )
      )
    }
    ,
    { dispatch: false });

  logout$ = createEffect(() => {
      return this.actions$
      .pipe(
        ofType(clearActiveUser),
        tap(() => {
          localStorage.removeItem('user');
        })
      )
    }
    , { dispatch: false });

  constructor(private actions$: Actions) {
  }
}
