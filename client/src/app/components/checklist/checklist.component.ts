import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ChecklistService } from 'src/app/services/checklist.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { QuestionBase } from 'src/app/models/form-models/questionBase';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionControlService } from 'src/app/services/question-control.service';
import { getDateOnly } from 'src/app/helpers/functions/getDateOnlyFn';
import { TextboxComponent } from '../form-questions/textbox/textbox.component';
import { SwitchComponent } from '../form-questions/switch/switch.component';
import { DropdownComponent } from '../form-questions/dropdown/dropdown.component';
import { DatePickerComponent } from '../form-questions/date-picker/date-picker.component';
import { createSwitchQuestion } from '../form-questions/switch/switchQuestion';
import { createTextboxQuestion } from '../form-questions/textbox/textboxQuestion';
import { createDateQuestion } from '../form-questions/date-picker/dateQuestion';
import { createSliderQuestion } from '../form-questions/slider/sliderQuestion';
import { SliderComponent } from '../form-questions/slider/slider.component';

@Component({
  standalone: true,
  selector: 'app-checklists',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  providers: [ChecklistService],
  imports: [AsyncPipe, CommonModule, ReactiveFormsModule, 
    TextboxComponent, SwitchComponent, DropdownComponent, DatePickerComponent, SliderComponent]
})
export class ChecklistComponent implements OnInit {
  // @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  //   if (this.changeMade && this.form.dirty) $event.returnValue = true;
  // }
  questions: QuestionBase<any>[] = [];
  payload: string = '';
  editMode: boolean = false;
  source: string = '';
  form!: FormGroup;
  originalPayload = '';
  changeMade: boolean = false;
  header: string = '';
  private readonly subscription = new Subscription();

  constructor(private checklistService: ChecklistService, private router: Router, 
    private route: ActivatedRoute, private qcs: QuestionControlService) 
  {
    const routeData = this.route.snapshot.data;
    this.source = routeData['metadata']['source'];
    if (routeData['checklist']) this.editMode = true;
    else this.changeMade = true;

    this.header = this.editMode ? 'Edit ' : 'Add ' + this.route.snapshot.data['metadata']['header'] + ' Entry';
    this.checklistService.getQuestions(this.source).subscribe(
      qs => {
        qs.forEach(q => {
          var key = q.key.toLowerCase();
          if (q.type == 'date') this.questions.push(createDateQuestion(key, q.label, true, routeData['checklist']))
          if (q.type == 'switch') this.questions.push(createSwitchQuestion(key, q.label, routeData['checklist']))
          if (q.type == 'text' || q.type == 'number') {
            this.questions.push(createTextboxQuestion(key, q.label, q.type, q.minValue, q.maxValue, routeData['checklist']))
          }
          if (q.type == 'slider') this.questions.push(createSliderQuestion(key, q.label, q.minValue, q.maxValue, routeData['checklist']))
        })
        // this.questions.unshift(createDateQuestion('date', 'Date', true, routeData['checklist']));
        this.createForm();
      }
    )
  }


  ngOnInit(): void {
  }

  createForm() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.payload = JSON.stringify(JSON.stringify(this.form!.getRawValue()));
    this.originalPayload = JSON.stringify(this.updatePayload());
    this.onChange();
  }
  
  //on change - run function to check validity, compare payload to original payload
  onChange() {
    const subscription = this.form!.valueChanges.subscribe(() => {
      this.payload = JSON.stringify(this.updatePayload());
      if (this.editMode) {
        if (this.payload != this.originalPayload) this.changeMade = true;
        else this.changeMade = false;
      } else {
        this.changeMade = true;
      }
    })
    this.subscription.add(subscription);
  }

  cancelForm() {
    this.subscription.unsubscribe();
    this.router.navigateByUrl('/data/' + this.source);
  }

  deleteEntry() {
    this.checklistService.deleteEntry(this.source, this.route.snapshot.data['metadata']['id']).subscribe({
      next: () => this.router.navigateByUrl('/data/' + this.source)
    });
  }

  submitForm() {
    this.payload = this.updatePayload();
    if (this.editMode) this.subscription.unsubscribe();
    var id = this.route.snapshot.data['metadata']['id'];
    this.checklistService.addOrUpdateEntry(this.source, this.payload, id).subscribe({
      next: () => {
        this.changeMade = false;  // disables guard
        this.router.navigateByUrl('/data/' + this.source);
      }
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
        if (q.controlType == 'checkbox') {
          if (payloadJSON[q.key] === "") payloadJSON[q.key] = 0;
          if (payloadJSON[q.key] === false) payloadJSON[q.key] = 0;
          if (payloadJSON[q.key] === true) payloadJSON[q.key] = 1;
        }
        if (q.controlType == 'textbox' && !q.required && payloadJSON[q.key] === "") payloadJSON[q.key] = null;
        if ((q.type == 'number' && payloadJSON[q.key] != "" && payloadJSON[q.key] != null && typeof(payloadJSON[q.key]) === 'number')
            || payloadJSON[q.key] === 0) {
          payloadJSON[q.key] = payloadJSON[q.key].toString();
        }
      }
    }
    return payloadJSON;
  }
}

