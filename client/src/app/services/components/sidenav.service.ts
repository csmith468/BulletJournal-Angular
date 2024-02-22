import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { VisibleChecklistType } from 'src/app/models/data-models/visibleChecklistType';
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
    this.http.get<VisibleChecklistType[]>(this.baseUrl + 'metadata/getVisibleChecklistTypes').pipe(
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
          icon: 'fa-solid fa-table',
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

  createSection(t: VisibleChecklistType[], routeLinkPrefix: string, routeLinkSuffix: string, labelPrefix: string) {
    const headers = t.filter(ct => ct.isHeader);
    const items = t.filter(ct => !ct.isHeader && !ct.category);
    const subItems = t.filter(ct => !ct.isHeader && ct.category);

    const groupedTables = subItems.reduce((categories: any, ct) => {
      if (ct.category) {
        if (!categories[ct.category.toLowerCase()]) categories[ct.category.toLowerCase()] = [];
        categories[ct.category.toLowerCase()].push(ct);
      }
      return categories;
    }, {});

    const sideNavItems: ISideNavData[] = items.filter(ct => !ct.category)
      .map(item => ({
        routeLink: routeLinkPrefix + '/' + item.key + routeLinkSuffix,
        icon: item.icon,
        label: labelPrefix + ' ' + item.label
      }));

    headers.forEach(header => {
      const headerNavItem: ISideNavData = {
        routeLink: routeLinkPrefix + '/' + header.key,
        icon: header.icon,
        label: labelPrefix + ' ' + header.label,
        items: groupedTables[header.key] ? groupedTables[header.key].map(
          (item: VisibleChecklistType) => ({
            routeLink: routeLinkPrefix + '/' + item.key + routeLinkSuffix,
            icon: item.icon,
            label: labelPrefix + ' ' + item.label
          })) : [],
      };

      sideNavItems.push(headerNavItem);
    })

    return sideNavItems;
  }
}
