import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { ISideNavData } from '../../../models/sidenav-data/ISideNavData';
import { AccountService } from 'src/app/services/http/account.service';
import { sidenav_fadeInOut } from './sidenav-styling/sidenav-fadeInOut';
import { SideNavToggle } from './sidenav-styling/sidenav-toggle';
import { Router } from '@angular/router';
import { sidenav_links_loggedOut } from '../../../models/sidenav-data/sidenav-links-loggedOut';
import { SettingsService } from 'src/app/services/http/settings.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    sidenav_fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('750ms', 
        keyframes([
          style({transform: 'rotate(0deg)', offset: '0'}),
          style({transform: 'rotate(1turn)', offset: '1'})
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  navOpen = false;
  screenWidth = 0;
  navData_loggedIn: ISideNavData[] = [];
  navData_loggedOut = sidenav_links_loggedOut;
  expandedItem: string | null = null;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 600) {
      this.navOpen = false;
      this.onToggleSideNav.emit({
        navOpen: this.navOpen,
        screenWidth: this.screenWidth
      });
    }
  }

  constructor(public settingsService: SettingsService, public accountService: AccountService, 
    public router: Router) {
      this.settingsService.sideNav$.subscribe(navData => {
        if ((this.accountService.currentUser$)) this.navData_loggedIn = navData;
      })
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  isExpanded(label: string) {
    return (label == this.expandedItem);
  }

  toggleCollapse() {
    this.navOpen = !this.navOpen;
    this.emitToggleSideNav();
  }

  openSideNav() {
    this.navOpen = true;
    this.emitToggleSideNav();
  }

  closeSideNav() {
    this.navOpen = false;
    this.expandedItem = '';
    this.emitToggleSideNav();
  }

  handleClick(item: ISideNavData) {
    // event.preventDefault();
    if (!this.navOpen) {
      this.navOpen = true;
      this.emitToggleSideNav();
    }
    if (this.expandedItem == item.label) this.expandedItem = null;
    else this.expandedItem = item.label;
  }

  // shrinkItems(item: ISideNavData) {
  //   this.expandedItem = 
  // }

  getActiveClass(data: ISideNavData) {
    return this.router.url.includes(data.routeLink) ? 'sub-active' : '';
  }

  emitToggleSideNav() {
    this.onToggleSideNav.emit({
      navOpen: this.navOpen,
      screenWidth: this.screenWidth
    });
  }
}
