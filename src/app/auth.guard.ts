import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { selectActiveUser } from './state/auth/auth.selector';
import { GeneralTexts } from './shared/general-texts.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select((selectActiveUser)).pipe(
      switchMap((user) => {
        const navigateTo = (link: string) => this.router.navigate([link]);
        if (!Boolean(user)) {
          void navigateTo('');
        }
        const isAdmin = user?.username === GeneralTexts.ADMIN;
        const isUser = user?.username === GeneralTexts.USER;
        return of(route.routeConfig?.path === GeneralTexts.ADMIN ? isAdmin : isUser);
      })
    );
  }
}
