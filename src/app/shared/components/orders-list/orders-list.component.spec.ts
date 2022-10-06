import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { OrdersListComponent } from './orders-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockOrdersData } from '../../data/mock-orders.data';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { initialState, OrderState } from '../../../state/orders/orders.reducer';

describe('OrdersListComponent', () => {
  let component: OrdersListComponent;
  let el: DebugElement;
  let fixture: ComponentFixture<OrdersListComponent>;
  let store: MockStore<OrderState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersListComponent],
      providers: [provideMockStore({ initialState })]
    }).overrideComponent(OrdersListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
    fixture = TestBed.createComponent(OrdersListComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have approve button', fakeAsync(() => {
    component.orders$ = of(MockOrdersData);
    flush();
    fixture.detectChanges();
    const rejectButton = el.queryAll(By.css('.btn-primary'))[0];
    expect(rejectButton.nativeElement.textContent).toContain('Approve Order');
  }));

  it('should have reject button', fakeAsync(() => {
    component.orders$ = of(MockOrdersData);
    flush();
    fixture.detectChanges();
    const rejectButton = el.queryAll(By.css('.btn-danger'))[0];
    expect(rejectButton.nativeElement.textContent).toContain('Reject Order');
  }));
});
