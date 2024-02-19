import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from 'src/app/models/question-models/questionBase';

@Component({
  standalone: true,
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SwitchComponent {
  @Input() question!: QuestionBase<any>;
  @Input() form!: FormGroup;


}
