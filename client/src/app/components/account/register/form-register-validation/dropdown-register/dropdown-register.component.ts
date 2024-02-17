import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { DropdownItem } from 'src/app/models/dropdownItem';

@Component({
  selector: 'app-dropdown-register',
  templateUrl: './dropdown-register.component.html',
  styleUrls: ['./dropdown-register.component.css']
})
export class DropdownInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() dropdownItems: DropdownItem[] = [];

  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
