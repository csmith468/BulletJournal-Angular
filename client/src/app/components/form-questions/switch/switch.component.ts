import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionFormItem } from 'src/app/models/question-models/questionFormItem';

@Component({
  standalone: true,
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SwitchComponent {
  @Input() item!: QuestionFormItem<any>;
  @Input() form!: FormGroup;
}
