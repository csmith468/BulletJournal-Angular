import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChecklistFormItem } from 'src/app/models/question-models/checklistFormItem';

@Component({
  standalone: true,
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DropdownComponent {
  @Input() item!: ChecklistFormItem<any>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.item.key].valid;
  }

}
