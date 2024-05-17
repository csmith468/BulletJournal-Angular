import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { QuestionFormItem } from 'src/app/models/question-models/questionFormItem';

@Component({
  standalone: true,
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatSliderModule]
})
export class SliderComponent {
  @Input() item!: QuestionFormItem<any>;
  @Input() form!: FormGroup;

  formatLabel(value: number): string {
    return (value >= 1000) ? (Math.round(value / 1000) + 'k') : value.toString();
  }
}
