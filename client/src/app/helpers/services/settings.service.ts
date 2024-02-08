import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { QuestionPreferences } from '../models/data-models/questionPreferences';
import { TablePreferences } from '../models/data-models/tablePreferences';
import { environment } from 'src/environments/environment';
import { Tables } from '../models/data-models/tables';
import { ISideNavData } from '../models/sidenav-data/sidenav-ISideNavData';
import { sidenav_fadeInOut } from 'src/app/components/layout/sidenav/sidenav-styling/sidenav-fadeInOut';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  baseUrl = environment.apiUrl;
  private questionPrefsSource = new Subject<{ source: string }>();

  constructor(private http: HttpClient) {
  }

  questionPrefs$ = this.questionPrefsSource.asObservable();

  changeQuestionPreferencesSource(source: string) {
    this.questionPrefsSource.next({ source });
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
    var result = this.http.put(this.baseUrl + 'user/updateMultipleTablePreferences', list);
    this.setSideNav();
    return result;
  }

  setSideNav(): Observable<ISideNavData[]> {
    return this.http.get<Tables[]>(this.baseUrl + 'user/getMyTables').pipe(
      map(t => [
        {
          routeLink: 'checklist',
          icon: 'fa fa-check-square-o',
          label: 'Checklists',
          items: this.createSection(t, 'checklists', '/add', 'Add')
        },
        {
          routeLink: 'data',
          icon: 'fa fa-table',
          label: 'Data',
          items: this.createSection(t, 'data', '', 'View')
        },
        {
          routeLink: 'trends',
          icon: 'fa fa-line-chart',
          label: 'Trends',
          items: this.createSection(t, 'trends', '', 'View')
        },
      ])
    );
  }

  createSection(t: Tables[], routeLinkPrefix: string, routeLinkSuffix: string, labelPrefix: string) {
    const headers = t.filter(table => table.isHeader);
    const items = t.filter(table => !table.isHeader && !table.category);
    const subItems = t.filter(table => !table.isHeader && table.category);

    const groupedTables = subItems.reduce((categories: any, table) => {
      if (table.category) {
        if (!categories[table.category.toLowerCase()]) categories[table.category.toLowerCase()] = [];
        categories[table.category.toLowerCase()].push(table);
      }
      return categories;
    }, {});

    const sideNavItems: ISideNavData[] = items.filter(table => !table.category)
      .map(item => ({
        routeLink: routeLinkPrefix + '/' + item.key + routeLinkSuffix,
        icon: item.icon,
        label: labelPrefix + ' ' + item.displayName
      }));

    headers.forEach(header => {
      const headerNavItem: ISideNavData = {
        routeLink: routeLinkPrefix + '/' + header.key,
        icon: header.icon,
        label: labelPrefix + ' ' + header.displayName,
        items: groupedTables[header.key] ? groupedTables[header.key].map(
          (item: Tables) => ({
            routeLink: routeLinkPrefix + '/' + item.key + routeLinkSuffix,
            icon: item.icon,
            label: labelPrefix + ' ' + item.displayName
          })) : [],
      };

      sideNavItems.push(headerNavItem);
    })

    return sideNavItems;
  }
}
