import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { ISideNavData } from './sidenav-data/sidenav-ISideNavData';
import { AccountService } from 'src/app/helpers/services/account.service';
import { sidenav_fadeInOut } from './sidenav-styling/sidenav-fadeInOut';
import { SideNavToggle } from './sidenav-styling/sidenav-toggle';
import { sidenav_links_loggedIn } from './sidenav-data/sidenav-links-loggedIn';
import { Router } from '@angular/router';
import { sidenav_links_loggedOut } from './sidenav-data/sidenav-links-loggedOut';

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
  navData_loggedIn = sidenav_links_loggedIn;
  navData_loggedOut = sidenav_links_loggedOut;
  multiple: boolean = false;

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

  constructor(public accountService: AccountService, public router: Router) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
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
    this.emitToggleSideNav();
  }

  handleClick(item: ISideNavData) {
    this.shrinkItems(item);
    if (!this.navOpen) {
      this.navOpen = true;
      this.emitToggleSideNav();
    }
    item.expanded = !item.expanded;
  }

  shrinkItems(item: ISideNavData) {
    if (!this.multiple) {
      for(let modelItem of (this.accountService.currentUser$) ? this.navData_loggedIn : this.navData_loggedOut) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

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
