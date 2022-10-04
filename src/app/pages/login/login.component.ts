import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectActiveUser, selectByUser } from '../../state/auth/auth.selector';
import { setActiveUser, setUsers } from '../../state/auth/auth.action';
import { MockUsersData } from '../../shared/mock-users.data';
import { getStoredUser } from '../../shared/get-stored-user.data';

@Component({
  selector: 'app-login',
  template: `
    <div class="app-login d-flex flex-column justify-content-center align-items-center position-fixed">
      <form [formGroup]="loginForm" (keyup.enter)="attemptLogin()">
        <label for="username">Username</label>
        <input type="text" class="form-control" placeholder="" id="username" formControlName="username">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="" id="password" formControlName="password">
      </form>
      <button class="btn btn-primary mt-2" type="submit" (click)="attemptLogin()">LOGIN</button>
    </div>
  `,
  styles: [`.app-login {
    inset: 0;
  }`]
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  loginForm!: FormGroup;
  router = inject(Router);
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(setUsers({ users: MockUsersData }));
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.store.select((selectActiveUser)).pipe(take(1)).subscribe(
      (user) => {
        const activeUser = Boolean(user) ? user : getStoredUser();
        if (Boolean(activeUser)) {
          void this.router.navigate([activeUser?.username as string]);
        }
      }
    );
  }

  onLogin(username: string): void {
    void this.router.navigate([username]);
    this.loginForm.reset();
  }

  attemptLogin(): void {
    this.store.select((selectByUser(this.loginForm.value))).pipe(take(1)).subscribe((userRes) => {
      if (userRes) {
        this.onLogin(userRes.username);
        this.store.dispatch(setActiveUser({ user: userRes }));
      }
      //  TODO ADD ERROR HANDLING OF WRONG LOGIN
    });
  }
}
