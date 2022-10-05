import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { selectActiveUser } from '../state/auth/auth.selector';
import { User } from '../state/models/user.model';
import { GeneralTexts } from '../shared/enums/general-texts.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const storedUserRef = localStorage.getItem(GeneralTexts.USER);
    const storedUser: User | undefined = storedUserRef !== GeneralTexts.UNDEFINED ? JSON.parse(storedUserRef as string) : undefined;
    return this.store.select((selectActiveUser)).pipe(
      switchMap((user) => {
        const navigateTo = (link: string) => this.router.navigate([link]);
        const activeUser = Boolean(user) ? user : storedUser;
        const doesPathMatch = activeUser?.username === route.routeConfig?.path;
        if (Boolean(activeUser) && doesPathMatch) {
          return of(doesPathMatch);
        } else if (Boolean(activeUser) && !doesPathMatch) {
          void navigateTo(activeUser?.username as string);
          return of(doesPathMatch);
        }
        void navigateTo('');
        return of(false);
      })
    );
  }
}
