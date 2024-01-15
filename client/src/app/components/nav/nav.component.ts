import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/helpers/services/account.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  collapseNav = false;
  collapseWelcome = false;

  constructor(public accountService: AccountService, private responsive: BreakpointObserver,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.responsive.observe(['(max-width: 433px)', '(min-width: 434px)', '(max-width: 991px)', 
      '(min-width: 992px)']).subscribe(
        result => {
          if (result.breakpoints['(max-width: 433px)']) {
            this.collapseWelcome = true;
            this.collapseNav = true;
          }
          if (result.breakpoints['(min-width: 434px)'] && result.breakpoints['(max-width: 991px)']) {
            this.collapseWelcome = false;
            this.collapseNav = true;
          }
          if (result.breakpoints['(min-width: 992px)']) {
            this.collapseWelcome = false;
            this.collapseNav = false;
          }
        }
      )
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
