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
import { authReducer } from './state/auth/auth.reducer';
import { OrdersListComponent } from './shared/components/orders-list/orders-list.component';
import { OrderFormComponent } from './shared/components/order-form/order-form.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import { OrderEffects } from './state/orders/orders.effects';
import { LogoutButtonComponent } from './shared/components/logout-button/logout-button.component';
import { GeneralTexts } from './shared/general-texts.enum';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    OrdersListComponent,
    OrderFormComponent,
    StoreModule.forRoot({ [GeneralTexts.USER]: authReducer, [GeneralTexts.ORDER]: ordersReducer }),
    EffectsModule.forRoot([AuthEffects, OrderEffects]),
    LogoutButtonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
