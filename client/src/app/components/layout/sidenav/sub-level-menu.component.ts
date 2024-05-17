import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/services/http/account.service';

import { sidenav_fadeInOut } from './sidenav-styling/sidenav-fadeInOut';
import { ISideNavData } from '../../../models/sidenav-data/ISideNavData';




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
          class="menu-collapse-icon {{!isExpanded(item.label) ? 'fa-solid fa-angle-right' : 'fa-solid fa-angle-down'}}" >
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
          [expanded]="(item.label == expandedItem)"
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
  expandedItem: string | null = null;

  constructor(private accountService: AccountService, public router: Router) { }

  ngOnInit(): void {
    
  }

  handleClick(item: any) {
    if (this.expandedItem == item.label) this.expandedItem = null;
    else this.expandedItem = item.label;
  }

  getActiveClass(item: ISideNavData) {
    return (item.label == this.expandedItem) && this.router.url.includes(item.routeLink) ? 'subactive-sublevel' : '';
  }

  isExpanded(label: string) {
    return (label == this.expandedItem);
  }
}
