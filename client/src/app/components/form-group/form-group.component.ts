import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { QuestionControlService } from 'src/app/helpers/services/question-control.service';
import { DropdownComponent } from './form-question/dropdown/dropdown.component';
import { SwitchComponent } from './form-question/switch/switch.component';
import { TextboxComponent } from './form-question/textbox/textbox.component';
import { DatePickerComponent } from './form-question/date-picker/date-picker.component';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css'],
  providers: [QuestionControlService],
  imports: [CommonModule, ReactiveFormsModule, 
    TextboxComponent, SwitchComponent, DropdownComponent, DatePickerComponent],
})
export class FormGroupComponent implements OnInit, OnDestroy {
  @Input() questions: QuestionBase<any>[] | null = [];
  @Input() requiresUpdate: boolean = false;
  @Input() formTitle: string = '';
  @Output() payloadOutput = new EventEmitter<string>();
  
  form!: FormGroup;
  payload = '';

  originalPayload = '';
  changeMade: boolean = true;
  private readonly subscription = new Subscription();

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<any>[]);
    this.payload = JSON.stringify(this.updatePayload());
    if (this.requiresUpdate) {
      this.originalPayload = JSON.stringify(this.updatePayload());
      this.changeMade = false;
      this.onChange();
    } else {
      // this.changeMade = true;
    }
  }

  ngOnDestroy(): void {
    if (this.requiresUpdate) this.subscription.unsubscribe();
  }

  //on change - run function to check validity, compare payload to original payload
  onChange() {
    const subscription = this.form.valueChanges.subscribe(() => {
      this.payload = JSON.stringify(this.updatePayload());
      if (this.payload != this.originalPayload) this.changeMade = true;
      else this.changeMade = false;
    })

    this.subscription.add(subscription);
  }



  onSubmit() {
    this.payloadOutput.emit(this.updatePayload());
  }

  updatePayload() {
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

    return payloadJSON;
  }
}
