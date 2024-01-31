import { Component, Input, OnInit } from '@angular/core';
import { ISideNavData } from '../../../helpers/models/sidenav-data/sidenav-ISideNavData';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { sidenav_fadeInOut } from './sidenav-styling/sidenav-fadeInOut';
import { AccountService } from 'src/app/helpers/services/account.service';
import { Router } from '@angular/router';


// ng g c components/sidenav/subLevelMenu --inline-template --inline-style --flat true
@Component({
  selector: 'app-sub-level-menu',
  template: `
  <ul *ngIf="navOpen && data.items && data.items.length > 0" 
    [@submenu]="expanded 
      ? {value: 'visible', params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*'}} 
      : {value: 'hidden', params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0'}} "
    class="sublevel-nav"
  >
    <li *ngFor="let item of data.items" class="sublevel-nav-item">
      <a class="sublevel-nav-link" 
        *ngIf="item.items && item.items.length > 0" 
        (click)="handleClick(item)"
        [ngClass]="getActiveClass(item)"
      >
        <i class="sublevel-link-icon {{item.icon}}"></i>
        <span class="sublevel-link-text" @fadeInOut
            *ngIf="navOpen">{{item.label}}
        </span>
        <i *ngIf="item.items && navOpen" 
          class="menu-collapse-icon {{!item.expanded ? 'fa fa-angle-right' : 'fa fa-angle-down'}}" >
        </i>
      </a>
      <a class="sublevel-nav-link"
        *ngIf="!item.items || (item.items && item.items.length === 0)"
        [routerLink]="[item.routeLink]"
        routerLinkActive="active-sublevel"
        [routerLinkActiveOptions]="{exact: true}"
      >
        <i class="sublevel-link-icon {{item.icon}}"></i>
        <span class="sublevel-link-text" @fadeInOut
            *ngIf="navOpen">{{item.label}}
        </span>
      </a>
      <div *ngIf="item.items && item.items.length > 0">
        <app-sub-level-menu
          [data]="item"
          [navOpen]="navOpen"
          [multiple]="multiple"
          [expanded]="item.expanded"
        ></app-sub-level-menu>
      </div>
    </li>
  </ul>
  `,
  styleUrls: ['./sidenav.component.css'],
  animations: [
    sidenav_fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({overflow: 'hidden'}),
        animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SubLevelMenuComponent implements OnInit{
  @Input() data: ISideNavData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }
  @Input() navOpen = true;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(private accountService: AccountService, public router: Router) { }

  ngOnInit(): void {
    
  }

  handleClick(item: any) {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: ISideNavData) {
    return item.expanded && this.router.url.includes(item.routeLink) ? 'subactive-sublevel' : '';
  }
}
