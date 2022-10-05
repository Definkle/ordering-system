import { Component, inject } from '@angular/core';
import { clearActiveUser } from '../../../state/auth/auth.action';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="btn btn-primary" (click)="onLogout()">Logout</button>
  `
})
export class LogoutButtonComponent {
  router = inject(Router);
  store = inject(Store);

  /**
   * Clears ngrx and local storage of active user
   * and navigate to login page.
   */
  onLogout(): void {
    this.store.dispatch(clearActiveUser());
    void this.router.navigate(['']);
  }
}
