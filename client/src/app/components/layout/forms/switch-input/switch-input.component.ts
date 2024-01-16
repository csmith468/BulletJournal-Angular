import { Component, Input, Self, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-switch-input',
  templateUrl: './switch-input.component.html',
  styleUrls: ['./switch-input.component.css'],
  // providers: [{
  //   provide: NG_VALUE_ACCESSOR,
  //   useExisting: forwardRef(() => SwitchInputComponent),
  //   multi: true
  // }]
})
export class SwitchInputComponent { //}implements ControlValueAccessor {
  // Bindable properties
  // @Input() label: string = '';
  // @Input() disabled = false;

  // // Internal properties
  // isChecked = false;
  // onChange(event: Event): void {}
  // onBlur(event: Event): void {}

  // writeValue(obj: boolean): void {
  //   this.isChecked = obj;
  // }

  // registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }

  // registerOnTouched(fn: any): void {
  //   this.onBlur = fn;
  // }

  // setDisabledState?(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }

  // onChanged($event: Event) {
  //   this.isChecked = $event && $event.target && (<HTMLInputElement>$event.target).checked;
  //   this.onChange(this.isChecked);
  // }
}