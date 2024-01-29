import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionControlService } from 'src/app/helpers/services/question-control.service';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';
import { TextboxComponent } from '../form-questions/textbox/textbox.component';
import { SwitchComponent } from '../form-questions/switch/switch.component';
import { DropdownComponent } from '../form-questions/dropdown/dropdown.component';
import { DatePickerComponent } from '../form-questions/date-picker/date-picker.component';
import { createSwitchQuestion } from '../form-questions/switch/switchQuestion';
import { createTextboxQuestion } from '../form-questions/textbox/textboxQuestion';
import { createDateQuestion } from '../form-questions/date-picker/dateQuestion';

@Component({
  standalone: true,
  selector: 'app-checklists',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  providers: [ChecklistService],
  imports: [AsyncPipe, CommonModule, ReactiveFormsModule, 
    TextboxComponent, SwitchComponent, DropdownComponent, DatePickerComponent]
})
export class ChecklistComponent implements OnInit {
  questions: QuestionBase<any>[] = [];
  payload: string = '';
  editMode: boolean = false;
  type: string = '';
  form!: FormGroup;
  originalPayload = '';
  changeMade: boolean = true;
  private readonly subscription = new Subscription();

  constructor(private checklistService: ChecklistService, private router: Router, 
    private route: ActivatedRoute, private qcs: QuestionControlService) 
  {
    const routeData = this.route.snapshot.data;
    this.type = routeData['metadata']['type'];
    if (routeData['checklist']) this.editMode = true;
    this.checklistService.getQuestions(this.type, routeData['checklist']).subscribe(
      qs => {
        qs.forEach(q => {
          if (q.type == 'switch') this.questions.push(createSwitchQuestion(q.key, q.question, routeData['checklist']))
          if (q.type == 'text' || q.type == 'number' || q.type == 'number positive') {
            this.questions.push(createTextboxQuestion(q.key, q.question, q.type, routeData['checklist']))
          }
        })
        this.questions.unshift(createDateQuestion('date', 'Date', true, routeData['checklist']));
        this.createForm();
      }
    )
  }


  ngOnInit(): void {
  }

  createForm() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.payload = JSON.stringify(this.updatePayload());
    if (this.editMode) {
      this.originalPayload = JSON.stringify(this.updatePayload());
      this.changeMade = false;
      this.onChange();
    } 
  }

  // ngOnDestroy(): void {
  //   if (this.editMode) this.subscription.unsubscribe();
  // }

  //on change - run function to check validity, compare payload to original payload
  onChange() {
    const subscription = this.form!.valueChanges.subscribe(() => {
      this.payload = JSON.stringify(this.updatePayload());
      if (this.payload != this.originalPayload) this.changeMade = true;
      else this.changeMade = false;
    })
    this.subscription.add(subscription);
  }

  cancelForm() {
    if (this.editMode) this.subscription.unsubscribe();
    this.router.navigateByUrl('/tables/' + this.type);
  }

  submitForm() {
    this.payload = this.updatePayload();
    if (this.editMode) this.subscription.unsubscribe();
    var id = this.route.snapshot.data['metadata']['id'];
    this.checklistService.addOrUpdateEntry(this.type, this.payload, id).subscribe({
      next: () => this.router.navigateByUrl('/tables/' + this.type)
    })
  }

  updatePayload() {
    // convert date to correct format
    var payloadJSON = JSON.parse(JSON.stringify(this.form!.getRawValue()));
    if (payloadJSON['date']) {
      payloadJSON['date'] = getDateOnly(payloadJSON['date']);
    }
    // all un-touched questions of type checkbox as false instead of empty string
    if (this.questions) {
      for (let q of this.questions) {
        if (q.controlType == 'checkbox' && payloadJSON[q.key] === "") payloadJSON[q.key] = false;
        if (q.controlType == 'textbox' && !q.required && payloadJSON[q.key] === "") payloadJSON[q.key] = null;
      }
    }
    return payloadJSON;
  }
}

