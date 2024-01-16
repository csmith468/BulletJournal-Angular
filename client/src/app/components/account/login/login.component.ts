import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/helpers/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService, private toastr: ToastrService, private router: Router) { }
  
  ngOnInit(): void {
    
  }


  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/checklists'),
      error: error => this.toastr.error(error.error)
    })
  }
}
