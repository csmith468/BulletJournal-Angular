import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from 'src/app/models/form-models/questionBase';

@Component({
  standalone: true,
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TextboxComponent {
  @Input() question!: QuestionBase<any>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid && this.form.controls[this.question.key].touched  && this.question.required
      && !this.emptyButRequired && !this.isTooSmall && !this.isTooLarge;
  }

  get emptyButRequired() {
    return !this.form.controls[this.question.key].valid && this.form.controls[this.question.key].touched && this.question.required;
  }

  get isTooSmall() {
    return this.form.controls[this.question.key].touched && this.question.type == 'number'
    && this.question.minValue != null && this.form.controls[this.question.key].value < this.question.minValue;
  }

  get isTooLarge() {
    return this.form.controls[this.question.key].touched && this.question.type == 'number'
    && this.question.maxValue != null && this.form.controls[this.question.key].value > this.question.maxValue;
  }
}
