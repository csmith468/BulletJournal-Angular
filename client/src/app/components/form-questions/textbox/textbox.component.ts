import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionFormItem } from 'src/app/models/question-models/questionFormItem';

@Component({
  standalone: true,
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TextboxComponent {
  @Input() item!: QuestionFormItem<any>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.item.key].valid 
      && this.form.controls[this.item.key].touched 
      && this.item.required
      && !this.emptyButRequired 
      && !this.isTooSmall 
      && !this.isTooLarge;
  }

  get emptyButRequired() {
    return !this.form.controls[this.item.key].valid 
      && this.form.controls[this.item.key].touched 
      && this.item.required;
  }

  get isTooSmall() {
    return this.form.controls[this.item.key].touched 
      && this.item.kindBase == 'number'
      && this.item.minValue
      && this.form.controls[this.item.key].value < this.item.minValue;
  }

  get isTooLarge() {
    return this.form.controls[this.item.key].touched 
      && this.item.kindBase == 'number'
      && this.item.maxValue
      && this.form.controls[this.item.key].value > this.item.maxValue;
  }
}
