import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectByUser } from '../../state/auth/auth.selector';
import { setActiveUser, setUsers } from '../../state/auth/auth.action';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { MockUsersData } from '../../shared/mock-users.data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
  }

  onLogin(username: string): void {
    username === 'user' ? this.router.navigate(['user']) : this.router.navigate(['admin']);
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
