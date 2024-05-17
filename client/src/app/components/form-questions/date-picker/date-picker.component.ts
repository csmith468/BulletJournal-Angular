import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QuestionFormItem } from 'src/app/models/question-models/questionFormItem';


@Component({
  standalone: true,
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule]
})
export class DatePickerComponent implements OnInit {
  @Input() item!: QuestionFormItem<any>;
  @Input() form!: FormGroup;
  @Input() minDate?: Date = new Date(new Date().setFullYear( new Date().getFullYear() - 10 ))
  @Input() maxDate?: Date = new Date(new Date().setFullYear( new Date().getFullYear() + 5 ))
  @Input() validityCheck? = true;
  
  bsValue:Date = new Date();

  bsConfig = {
    dateInputFormat: 'MMM DD, YYYY',
    containerClass: 'theme-blue',
    showClearButton: true,
    clearPosition: 'right',
    showWeekNumbers: false
    // isAnimated: true
  };

  constructor() { }

  ngOnInit(): void {
    this.bsValue = <Date>this.item.value;
  }

  get isValid() {
    return this.form.controls[this.item.key].valid;
  }

}
