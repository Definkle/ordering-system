import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StoreModule } from '@ngrx/store';
import { ordersReducer } from './state/orders/orders.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { authReducer } from './state/auth/auth.reducer';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrderFormComponent } from './pages/order-form/order-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ users: authReducer, orders: ordersReducer }),
    ReactiveFormsModule,
    OrdersListComponent,
    OrderFormComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
