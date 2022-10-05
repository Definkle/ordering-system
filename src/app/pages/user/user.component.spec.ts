import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { LogoutButtonComponent } from '../../shared/components/logout-button/logout-button.component';
import { OrderFormComponent } from '../../shared/components/order-form/order-form.component';
import { OrdersListComponent } from '../../shared/components/orders-list/orders-list.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, OrderFormComponent, OrdersListComponent, LogoutButtonComponent],
      providers: [FormBuilder, provideMockStore({})]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
