import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ordersReducer } from './state/orders/orders.reducer';
import { authReducer } from './state/auth/auth.reducer';
import { OrdersListComponent } from './shared/components/orders-list/orders-list.component';
import { OrderFormComponent } from './shared/components/order-form/order-form.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import { OrderEffects } from './state/orders/orders.effects';
import { LogoutButtonComponent } from './shared/components/logout-button/logout-button.component';
import { GeneralTexts } from './shared/enums/general-texts.enum';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AdminModule } from './pages/admin/admin.module';
import { LoginModule } from './pages/login/login.module';
import { UserModule } from './pages/user/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    LoginModule,
    UserModule,
    OrdersListComponent,
    OrderFormComponent,
    StoreModule.forRoot({ [GeneralTexts.USER]: authReducer, [GeneralTexts.ORDER]: ordersReducer }),
    EffectsModule.forRoot([AuthEffects, OrderEffects]),
    LogoutButtonComponent,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
