import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { QuestionControlService } from 'src/app/helpers/services/question-control.service';
import { FormQuestionComponent } from './form-question/form-question.component';
import { DropdownComponent } from './form-question/dropdown/dropdown.component';
import { SwitchComponent } from './form-question/switch/switch.component';
import { TextboxComponent } from './form-question/textbox/textbox.component';
import { DatePickerComponent } from './form-question/date-picker/date-picker.component';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';

@Component({
  standalone: true,
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css'],
  providers: [QuestionControlService],
  imports: [CommonModule, FormQuestionComponent, ReactiveFormsModule, 
    TextboxComponent, SwitchComponent, DropdownComponent, DatePickerComponent],
})
export class FormGroupComponent implements OnInit {
  @Input() questions: QuestionBase<string | boolean | Date>[] | null = [];
  form!: FormGroup;
  payload = '';
  @Output() payloadOutput = new EventEmitter<string>();

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string | boolean | Date>[]);
  }

  onSubmit() {
    this.payload = JSON.stringify(this.form.getRawValue());

    // convert date to correct format
    var payloadJSON = JSON.parse(JSON.stringify(this.form.getRawValue()));
    if (payloadJSON['date']) {
      payloadJSON['date'] = getDateOnly(payloadJSON['date']);
    }

    // all un-touched questions of type checkbox as false instead of empty string
    if (this.questions) {
      for (let q of this.questions) {
        if (q.controlType == 'checkbox' && payloadJSON[q.key] === "") {
          payloadJSON[q.key] = false;
        }
      }
    }

    this.payload = JSON.stringify(payloadJSON);
    this.payloadOutput.emit(payloadJSON);
  }
}
