import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionFormItem } from 'src/app/models/question-models/questionFormItem';

@Component({
  standalone: true,
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DropdownComponent {
  @Input() item!: QuestionFormItem<any>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.item.key].valid;
  }

}
