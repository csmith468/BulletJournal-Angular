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
      group[question.key] = question.required 
        ? new FormControl(question.value || value, Validators.required)
        : new FormControl(question.value || value);
    });

    return new FormGroup(group);
  }
}
