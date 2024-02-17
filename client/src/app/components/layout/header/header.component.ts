import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Input() navOpen = false;
  @Input() screenWidth = 0;
  model: any = {};

  constructor(public accountService: AccountService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    
  }

  getHeadClass() {
    let styleClass = '';
    if (this.navOpen && this.screenWidth > 600) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/checklists'),
      error: error => this.toastr.error(error.error)
    })
  }

  logout() {
    this.accountService.logout();
    this.model = {};
    this.router.navigateByUrl('/');
  }
}
