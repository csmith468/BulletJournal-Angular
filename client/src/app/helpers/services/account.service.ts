import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, map, of } from 'rxjs';
import { User } from '../models/data-models/user';
import { TimezoneLocation } from '../models/data-models/timezoneLocation';
import { QuestionPrefDto, QuestionPreferences } from '../models/data-models/questionPreferences';
import { TablePreferences } from '../models/data-models/tablePreferences';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  private questionPrefsSource = new Subject<{source: string}>();

  constructor(private http: HttpClient) { 
  }

  questionPrefs$ = this.questionPrefsSource.asObservable();

  changeQuestionPreferencesSource(source: string) {
    this.questionPrefsSource.next({source});
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

  getQuestionPreferences(type: string) {
    return this.http.get<QuestionPreferences[]>(this.baseUrl + 'user/getQuestionPreferencesByType/' + type);
  }

  updateQuestionPreferences(list: any) {
    return this.http.put(this.baseUrl + 'user/updateMultipleQuestionPreferences', list);
  }

  getTablePreferences() {
    return this.http.get<TablePreferences[]>(this.baseUrl + 'user/getTablePreferences');
  }

  updateTablePreferences(list: any) {
    return this.http.put(this.baseUrl + 'user/updateMultipleTablePreferences', list);
  }


  // updateQuestionPreferences(prefs: QuestionPreferences) {
  //   console.log(prefs);
  //   return this.http.put(this.baseUrl + 'user/updateQuestionPreferences', prefs);
  // }
}
