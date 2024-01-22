import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { QuestionControlService } from 'src/app/helpers/services/question-control.service';
import { FormQuestionComponent } from './form-question/form-question.component';

@Component({
  standalone: true,
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css'],
  providers: [QuestionControlService],
  imports: [CommonModule, FormQuestionComponent, ReactiveFormsModule],
})
export class FormGroupComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payload = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    this.payload = JSON.stringify(this.form.getRawValue());
  }

}
