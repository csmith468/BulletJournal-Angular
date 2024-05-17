import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { QuestionFormItem } from 'src/app/models/question-models/questionFormItem';

@Component({
  selector: 'app-textArea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textArea.component.html',
  styleUrl: './textArea.component.css'
})
export class TextAreaComponent {
  @Input() item!: QuestionFormItem<any>;
  @Input() form!: FormGroup;
}
