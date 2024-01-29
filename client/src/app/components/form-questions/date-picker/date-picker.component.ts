import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


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
