import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { selectIsAuthenticated } from './store/auth/auth.selectors';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideMockStore({ selectors: [{ selector: selectIsAuthenticated, value: false }] }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should expose authentication state from the store', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.isAuthenticated$.subscribe((authenticated) => {
      expect(authenticated).toBeFalse();
      done();
    });
  });
});
