import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Tables } from 'src/app/models/data-models/tables';
import { ISideNavData } from 'src/app/models/sidenav-data/ISideNavData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  baseUrl = environment.apiUrl;
  private sideNavSubject = new BehaviorSubject<ISideNavData[]>([]);
  sideNav$: Observable<ISideNavData[]> = this.sideNavSubject.asObservable();

  constructor(private http: HttpClient) { }


  setSideNav() {
    this.http.get<Tables[]>(this.baseUrl + 'metadata/getMyTables').pipe(
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
