import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LogoutButtonComponent } from './logout-button.component';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutButtonComponent],
      declarations: [],
      providers: [provideMockStore({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
