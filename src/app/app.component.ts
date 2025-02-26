import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUserFromStorage } from './store/auth/auth.actions';
import { selectIsAuthenticated } from './store/auth/auth.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  ngOnInit() {
    this.store.dispatch(loadUserFromStorage());
    this.isAuthenticated$.subscribe((isAuth) => {
      if (!isAuth) {
        this.router.navigate(['/login']);
      }
    });
  }
}
