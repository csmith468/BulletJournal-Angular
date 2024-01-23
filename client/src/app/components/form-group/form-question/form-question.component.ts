import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { TextboxComponent } from './textbox/textbox.component';
import { SwitchComponent } from './switch/switch.component';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  standalone: true,
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css'],
  imports: [CommonModule, ReactiveFormsModule, TextboxComponent, SwitchComponent, DropdownComponent],
})
export class FormQuestionComponent {
  @Input() question!: QuestionBase<string | boolean | Date>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
