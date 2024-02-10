import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';


@Component({
  standalone: true,
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule]
})
export class DatePickerComponent implements OnInit {
  @Input() question!: QuestionBase<any>;
  @Input() form!: FormGroup;
  @Input() minDate?: Date = new Date(new Date().setFullYear( new Date().getFullYear() - 10 ))
  @Input() maxDate?: Date = new Date(new Date().setFullYear( new Date().getFullYear() + 5 ))
  @Input() validityCheck? = true;

  bsConfig = {
    dateInputFormat: 'MMM DD, YYYY',
    containerClass: 'theme-blue',
    showClearButton: true,
    clearPosition: 'right',
    showWeekNumbers: false
    // isAnimated: true
  };

  bsValue:Date = new Date();

  ngOnInit(): void {
    this.bsValue = <Date>this.question.value;
  }

  constructor() {
  }

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

}
