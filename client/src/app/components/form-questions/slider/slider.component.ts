import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChecklistFormItem } from 'src/app/models/question-models/checklistFormItem';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  standalone: true,
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatSliderModule]
})
export class SliderComponent {
  @Input() item!: ChecklistFormItem<any>;
  @Input() form!: FormGroup;

  formatLabel(value: number): string {
    return (value >= 1000) ? (Math.round(value / 1000) + 'k') : value.toString();
  }
}
