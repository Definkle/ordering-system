import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { selectActiveUser } from './state/auth/auth.selector';
import { getStoredUser } from './shared/get-stored-user.data';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const storedUser = getStoredUser();
    return this.store.select((selectActiveUser)).pipe(
      switchMap((user) => {
        const navigateTo = (link: string) => this.router.navigate([link]);
        const activeUser = Boolean(user) ? user : storedUser;
        const doesPathMatch = route.routeConfig?.path === storedUser?.username || route.routeConfig?.path === user?.username;
        if (doesPathMatch) {
          void navigateTo(activeUser?.username as string);
          return of(doesPathMatch);
        }
        void navigateTo('');
        return of(false);
      })
    );
  }
}
