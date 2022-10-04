import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
