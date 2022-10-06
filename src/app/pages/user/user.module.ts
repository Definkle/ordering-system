import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRouterModule } from './user-routing.module';
import { OrderFormComponent } from '../../shared/components/order-form/order-form.component';
import { OrdersListComponent } from '../../shared/components/orders-list/orders-list.component';
import { LogoutButtonComponent } from '../../shared/components/logout-button/logout-button.component';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRouterModule,
    OrderFormComponent,
    OrdersListComponent,
    LogoutButtonComponent
  ],
  exports: [UserComponent]
})
export class UserModule {
}
