import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import { UserQuestionPrefDto, UserQuestionPreferences } from 'src/app/helpers/models/data-models/userQuestionPreferences';
import { AccountService } from 'src/app/helpers/services/account.service';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';

@Component({
  selector: 'app-choose-questions',
  templateUrl: './choose-questions.component.html',
  styleUrls: ['./choose-questions.component.css']
})
export class ChooseQuestionsComponent implements OnDestroy {
  @ViewChild('questionTabs') questionTabs!: TabsetComponent;

  activeTab?: TabDirective;
  tableNames: { [key: string]: string } = {'Morning': 'morning', 'Night': 'night', 'Daily': 'daily', 'Wellbeing': 'wellbeing', 
    'Physical Symptoms': 'physical', 'Spending': 'spending', 'Sleep': 'sleep'};
  activeTabName: string = 'Daily';
  questions: UserQuestionPreferences[] = [];
  form!: FormGroup;
  private readonly subscription = new Subscription();
  payload: string = '';
  originalPayload: string = '';
  changeMade: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    this.activeTabName = data.heading!;
    this.getData();
  }

  getData() {
    const group: any = {};
    this.questions = [];

    this.accountService.getUserQuestionPreferences(this.tableNames[this.activeTabName]).subscribe(
      columns => {
        columns.forEach(
          c => {
            group[c.columnName] = new FormControl(c.isColumnVisible);
            this.questions.push(c);
          }
        )
        this.form = new FormGroup(group);
        this.originalPayload = JSON.stringify(JSON.stringify(this.form!.getRawValue()));
        this.payload = this.originalPayload;
        this.onChange();
      }
    )
  }

  submitForm() {
    var finalPrefs: UserQuestionPrefDto[] = [];

    Object.keys(this.form.controls).forEach(c => {
      const control = this.form.get(c);

      if (control && control.dirty) {
        const question = this.questions.find(q => q.tableName == this.tableNames[this.activeTabName]
            && q.columnName == c);
        if (question && question.isColumnVisible != control.value) {
          question.isColumnVisible = control.value;
          finalPrefs.push({userQuestionPreferencesID: question.userQuestionPreferencesID, isColumnVisible: control.value});
        }
      }
    })
    if (finalPrefs.length > 0) {
      this.accountService.updateUserQuestionPreferences(finalPrefs).subscribe({
        next: () => this.router.navigateByUrl('/profile')
      })
    }
  }

  cancelForm() {
    this.getData();
  }

  //on change - compare payload to original payload
  onChange() {
    const subscription = this.form!.valueChanges.subscribe(() => {
      this.payload = JSON.stringify(JSON.stringify(this.form!.getRawValue()));
      if (this.payload != this.originalPayload) this.changeMade = true;
      else this.changeMade = false;
    })
    this.subscription.add(subscription);
  }

  markAllTrue() {
    Object.keys(this.form.controls).forEach(controlName => {
      this.form.get(controlName)!.setValue(true);
    });
  }

  markAllFalse() {
    Object.keys(this.form.controls).forEach(controlName => {
      this.form.get(controlName)!.setValue(false);
    });
  }
}
