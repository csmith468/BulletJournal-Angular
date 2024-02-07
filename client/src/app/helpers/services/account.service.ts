import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, map, of } from 'rxjs';
import { User } from '../models/data-models/user';
import { TimezoneLocation } from '../models/data-models/timezoneLocation';
import { UserQuestionPreferences } from '../models/data-models/userQuestionPreferences';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  private userQuestionPrefsSource = new Subject<{source: string}>();

  constructor(private http: HttpClient) { 
  }

  userQuestionPrefs$ = this.userQuestionPrefsSource.asObservable();

  changeUserQuestionPreferencesSource(source: string) {
    this.userQuestionPrefsSource.next({source});
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
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
  }

  getTimezones() {
    return this.http.get<TimezoneLocation[]>(this.baseUrl + 'account/timezones');
  }

  getUserQuestionPreferences(type: string) {
    return this.http.get<UserQuestionPreferences[]>(this.baseUrl + 'user/getUserQuestionPreferencesByType/' + type);
  }

  updateUserQuestionPreferences(prefs: UserQuestionPreferences) {
    console.log(prefs);
    return this.http.put(this.baseUrl + 'user/updateUserQuestionPreferences', prefs);
  }
}
