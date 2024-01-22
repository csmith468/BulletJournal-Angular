import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';

@Component({
  standalone: true,
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DropdownComponent {
  @Input() question!: QuestionBase<string | boolean>;
  @Input() form!: FormGroup;

}
