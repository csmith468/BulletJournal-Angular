import { Injectable } from '@angular/core';
import { QuestionBase } from '../models/form-models/questionBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {
  toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};

    questions.forEach(question => {
      var value = (question.controlType === 'checkbox') ? false : '';
      var validators: any[] = []
      if (question.required) validators.push(Validators.required)
      if (question.type == 'number positive') validators.push(Validators.min(0))
      group[question.key] = new FormControl(question.value || value, validators)
    });

    return new FormGroup(group);
  }
}
