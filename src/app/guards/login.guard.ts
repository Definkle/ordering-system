import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { selectActiveUser } from '../state/auth/auth.selector';
import { User } from '../state/models/user.model';
import { GeneralTexts } from '../shared/general-texts.enum';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  /**
   * Check if user is logged in via local storage and rxjs.
   * If user is logged in then route them to their page based
   * on their username.
   */
  canActivate(): Observable<boolean> {
    return this.store.select((selectActiveUser)).pipe(
      switchMap((user) => {
        const activeUser = Boolean(user) ? user : this.getStoredUser();
        if (activeUser) void this.router.navigate([activeUser.username]);
        return of(!Boolean(activeUser));
      })
    );
  }

  /**
   * Gets user from local storage.
   * @private
   */
  private getStoredUser(): User | undefined {
    const storedUserRef = localStorage.getItem(GeneralTexts.USER);
    return storedUserRef !== GeneralTexts.UNDEFINED ? JSON.parse(storedUserRef as string) : undefined;
  }
}
