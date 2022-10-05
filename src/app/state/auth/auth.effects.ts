import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { clearActiveUser, setActiveUser } from './auth.action';
import { GeneralTexts } from '../../shared/general-texts.enum';

@Injectable()
export class AuthEffects {
  router = inject(Router);
  login$ = createEffect(() => {
      return this.actions$
      .pipe(
        ofType(setActiveUser),
        tap(action => localStorage.setItem(GeneralTexts.USER,
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
          localStorage.removeItem(GeneralTexts.USER);
        })
      )
    }
    , { dispatch: false });

  constructor(private actions$: Actions) {
  }
}
