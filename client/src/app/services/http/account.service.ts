import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PreferencesService } from './preferences.service';
import { TimezoneLocation } from '../../models/data-models/timezoneLocation';
import { User } from '../../models/data-models/user';
import { SidenavService } from '../components/sidenav.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private sidenavService: SidenavService) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) this.setCurrentUser(user);
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) this.setCurrentUser(user);
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    if (user) this.sidenavService.setSideNav();
  }

  getTimezones() {
    return this.http.get<TimezoneLocation[]>(this.baseUrl + 'static/timezones');
  }

}
