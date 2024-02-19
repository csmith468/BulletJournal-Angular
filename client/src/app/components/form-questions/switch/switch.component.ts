import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChecklistFormItem } from 'src/app/models/question-models/checklistFormItem';

@Component({
  standalone: true,
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SwitchComponent {
  @Input() item!: ChecklistFormItem<any>;
  @Input() form!: FormGroup;
}
