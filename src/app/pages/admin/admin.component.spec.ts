import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AdminComponent } from './admin.component';
import { LogoutButtonComponent } from '../../shared/components/logout-button/logout-button.component';
import { OrdersListComponent } from 'src/app/shared/components/orders-list/orders-list.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [LogoutButtonComponent, OrdersListComponent],
      providers: [provideMockStore({})]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AdminComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
