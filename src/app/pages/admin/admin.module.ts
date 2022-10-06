import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRouterModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OrdersListComponent } from '../../shared/components/orders-list/orders-list.component';
import { LogoutButtonComponent } from '../../shared/components/logout-button/logout-button.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRouterModule,
    OrdersListComponent,
    LogoutButtonComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule {
}
