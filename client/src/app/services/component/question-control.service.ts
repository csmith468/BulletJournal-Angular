import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from '../../models/form-models/questionBase';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {
  toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      var value = (question.controlType === 'checkbox') ? false : '';
      value = (question.controlType === 'number' && question.value == 0) ? 0 : question.value;
      var validators: any[] = [];
      if (question.required) validators.push(Validators.required);
      if (question.minValue != null) validators.push(Validators.min(question.minValue));
      if (question.maxValue != null) validators.push(Validators.max(question.maxValue));
      group[question.key] = new FormControl(question.value || value, validators);
    });

    return new FormGroup(group);
  }
}
