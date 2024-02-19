import { Component, HostListener, OnInit } from '@angular/core';
import { ChecklistService } from 'src/app/services/http/checklist.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChecklistFormItem } from 'src/app/models/question-models/checklistFormItem';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionControlService } from 'src/app/services/components/question-control.service';
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
import { MetadataService } from 'src/app/services/http/metadata.service';
import { ChecklistQuestion } from 'src/app/models/question-models/checklistQuestion';

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
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.changeMade && this.form.dirty && !this.saving) $event.returnValue = true;
  }
  checklistFormItems: ChecklistFormItem<any>[] = [];
  payload: string = '';
  editMode: boolean = false;
  source: string = '';
  form!: FormGroup;
  originalPayload = '';
  changeMade: boolean = false;
  header: string = '';
  saving: boolean = false;
  private readonly subscription = new Subscription();

  constructor(private checklistService: ChecklistService, private router: Router, private route: ActivatedRoute, 
    private qcs: QuestionControlService, private metadataService: MetadataService) 
  {
    const routeData = this.route.snapshot.data;
    this.source = routeData['metadata']['source'];
    if (routeData['checklist']) this.editMode = true;
    else this.changeMade = true;

    this.header = this.editMode ? 'Edit ' : 'Add ' + this.route.snapshot.data['metadata']['header'] + ' Entry';
    this.metadataService.getChecklistQuestions(this.source).subscribe(
      qs => {
        qs.forEach(
          q => this.createFormItem(q, routeData['checklist'])
        )
        this.createForm();
      }
    )
  }

  createFormItem(q: ChecklistQuestion, checklist: any) {
    if (q.kindBase == 'date') 
      this.checklistFormItems.push(createDateQuestion(q, checklist))
    
    if (q.kindBase == 'switch') 
      this.checklistFormItems.push(createSwitchQuestion(q, checklist))
    
    if (q.kindBase == 'text' || q.kindBase == 'number') 
      this.checklistFormItems.push(createTextboxQuestion(q, checklist))

    if (q.kindBase == 'slider' && q.minValue && q.maxValue) 
      this.checklistFormItems.push(createSliderQuestion(q, checklist))

    // eventually add textarea question
  }


  ngOnInit(): void {
  }

  createForm() {
    this.form = this.qcs.toFormGroup(this.checklistFormItems);
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
    this.saving = true;
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
    var payloadJSON = JSON.parse(JSON.stringify(this.form!.getRawValue()));
    // if (payloadJSON['date']) payloadJSON['date'] = getDateOnly(payloadJSON['date']);
    
    if (this.checklistFormItems) {
      for (let q of this.checklistFormItems) {
        
        if (q.kindBase == 'switch') {
          payloadJSON[q.key] = (payloadJSON[q.key] === true) ? 1 : 0; // empty string (untouched) or false = 0
        }

        if (q.kindBase == 'text' && !q.required && payloadJSON[q.key] === "") payloadJSON[q.key] = null;

        if ((q.kindBase == 'number' && payloadJSON[q.key] != "" && payloadJSON[q.key] != null && typeof(payloadJSON[q.key]) === 'number')
            || payloadJSON[q.key] === 0) {
          payloadJSON[q.key] = payloadJSON[q.key].toString();
        }

        if (q.kindBase == 'date') {
          payloadJSON[q.key] = getDateOnly(payloadJSON[q.key])
        }
      }
    }
    return payloadJSON;
  }
}

