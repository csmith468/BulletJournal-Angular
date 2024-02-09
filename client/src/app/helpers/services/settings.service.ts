import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { QuestionPreferences } from '../models/data-models/questionPreferences';
import { TablePreferences } from '../models/data-models/tablePreferences';
import { environment } from 'src/environments/environment';
import { Tables } from '../models/data-models/tables';
import { ISideNavData } from '../models/sidenav-data/ISideNavData';
import { sidenav_fadeInOut } from 'src/app/components/layout/sidenav/sidenav-styling/sidenav-fadeInOut';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  baseUrl = environment.apiUrl;
  private questionPrefsSource = new Subject<{ source: string }>();
  private sideNavSubject = new BehaviorSubject<ISideNavData[]>([]);

  sideNav$: Observable<ISideNavData[]> = this.sideNavSubject.asObservable();

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
    return this.http.put(this.baseUrl + 'user/updateMultipleTablePreferences', list).pipe(
      map(response => {
        this.setSideNav();
        return response;
      })
    );
  }

  getMyTables() {
    return this.http.get<Tables[]>(this.baseUrl + 'user/getMyTables').pipe(map(
      tables => {
        return tables.map(table => {
          if (table.category) {
            // If the table has a category, update the displayName
            table.displayName = table.category + ' ' + table.displayName;
          }
          return table;
        }).filter(table => !table.isHeader);
      }
    ))
  }

  setSideNav() {
    this.http.get<Tables[]>(this.baseUrl + 'user/getMyTables').pipe(
      map(t => [
        {
          routeLink: '',
          icon: 'fa-solid fa-house',
          label: 'Home'
        },
        {
          routeLink: 'checklist',
          icon: 'fa-solid fa-check',
          label: 'Checklists',
          items: this.createSection(t, 'checklists', '/add', 'Add')
        },
        {
          routeLink: 'data',
          icon: 'fa-solid fa-table-list',
          label: 'Data',
          items: this.createSection(t, 'data', '', 'View')
        },
        {
          routeLink: 'trends',
          icon: 'fa-solid fa-chart-line',
          label: 'Trends',
          items: this.createSection(t, 'trends', '', 'View')
        },
        {
          routeLink: 'about',
          icon: 'fa-solid fa-circle-info',
          label: 'About'
        },
      ])
    ).subscribe((sideNavData: ISideNavData[]) => {
      this.sideNavSubject.next(sideNavData);
    })
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
