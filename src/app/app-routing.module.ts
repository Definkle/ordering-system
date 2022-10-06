import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { OrderResolver } from './resolvers/orders.resolver';
import { UsersResolver } from './resolvers/users.resolver';
import { GeneralTexts } from './shared/enums/general-texts.enum';

const routes: Routes = [
  { path: '', redirectTo: GeneralTexts.LOGIN, pathMatch: 'full' },
  {
    path: GeneralTexts.ADMIN,
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    resolve: [OrderResolver]
  },
  {
    path: GeneralTexts.LOGIN,
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard],
    resolve: [UsersResolver]
  },
  {
    path: GeneralTexts.USER,
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
    resolve: [OrderResolver]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
