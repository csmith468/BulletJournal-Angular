import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DropdownItem } from 'src/app/helpers/models/dropdownItem';
import { TimezoneLocation } from 'src/app/helpers/models/data-models/timezoneLocation';
import { AccountService } from 'src/app/helpers/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  timezones: TimezoneLocation[] = [];
  timezoneDropdown: DropdownItem[] = [];

  constructor(private accountService: AccountService, private fb: FormBuilder, 
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadTimezones();
    this.initializeForm();
  }

  loadTimezones() {
    this.accountService.getTimezones().subscribe({
      next: timezones => {
        this.timezones = timezones,
        this.timezoneDropdown = timezones.map<DropdownItem>(
          t => ({
            id: t.timezoneLocationID,
            display: t.timezoneLocationName
          })
        )
      }
    })
  }

  initializeForm() { 
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      timezoneLocationId: ['', [Validators.required]],
      password: ['', [
        Validators.required, Validators.minLength(4), this.hasNumber(),
          this.hasUpper(), this.hasLower()]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    };
  }

  hasNumber(): ValidatorFn {
    return (control: AbstractControl) => {
      return /\d/.test(control.value) ? null : {missingNumber: true}
    };
  }

  hasUpper(): ValidatorFn {
    return (control: AbstractControl) => {
      return /[A-Z]/.test(control.value) ? null : {missingUpper: true}
    };
  }

  hasLower(): ValidatorFn {
    return (control: AbstractControl) => {
      return /[a-z]/.test(control.value) ? null : {missingLower: true}
    };
  }

  register() { 
    const values = {...this.registerForm.value};
    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/')
      },
      error: error => {
        this.validationErrors = error
      }
    });
  };

  cancel() {
    this.router.navigateByUrl('/')
  }
}
