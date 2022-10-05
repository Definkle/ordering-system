import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { OrderResolver } from './resolvers/orders.resolver';
import { UsersResolver } from './resolvers/users.resolver';
import { GeneralTexts } from './shared/general-texts.enum';

const routes: Routes = [
  { path: '', redirectTo: GeneralTexts.LOGIN, pathMatch: 'full' },
  { path: GeneralTexts.ADMIN, component: AdminComponent, canActivate: [AuthGuard], resolve: [OrderResolver] },
  { path: GeneralTexts.LOGIN, component: LoginComponent, canActivate: [LoginGuard], resolve: [UsersResolver] },
  { path: GeneralTexts.USER, component: UserComponent, canActivate: [AuthGuard], resolve: [OrderResolver] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
