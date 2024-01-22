import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
export class DatePickerComponent {
  @Input() question!: QuestionBase<string | boolean>;
  @Input() form!: FormGroup;

  bsConfig = {
    dateInputFormat: 'MM-DD-YYYY',
    containerClass: 'theme-dark-blue',
    showClearButton: true,
    clearPosition: 'right'
  };

  constructor() {
  }

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

}
