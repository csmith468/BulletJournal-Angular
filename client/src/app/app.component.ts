import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { SideNavToggle } from './components/layout/sidenav/sidenav-styling/sidenav-toggle';
import { User } from './models/data-models/user';
import { AccountService } from './services/http/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bullet Journal';
  users: any;
  isSideNavOpen = false;
  screenWidth = 0;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavOpen = data.navOpen;

    // If on trends page, make apex charts think the window resized so it will resize the charts to fit
    if (location.pathname.includes('trends')) {
      window.dispatchEvent(new Event('resize'));
    }
  }
}
