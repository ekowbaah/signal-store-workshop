import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthService {
  private storageKey = 'fakeUser';
  private user: { id: string; name: string } | null = null;

  constructor(private supabaseService: SupabaseService) {
    this.loadUser();
  }

  loadUser() {
    const userData = localStorage.getItem(this.storageKey);
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  isUserRegistered(): boolean {
    return !!this.user;
  }

  getUser(): { id: string; name: string } | null {
    return this.user;
  }

  async registerUser(username: string) {
    const userId = `user_${Math.random().toString(36).substr(2, 9)}`;

    await this.supabaseService.saveUser(userId, username);

    this.user = { id: userId, name: username };
    localStorage.setItem(this.storageKey, JSON.stringify(this.user));
  }
}
