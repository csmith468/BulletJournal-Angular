import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import { QuestionPrefDto, QuestionPreferences } from 'src/app/models/data-models/questionPreferences';
import { MetadataService } from 'src/app/services/http/metadata.service';
import { PreferencesService } from 'src/app/services/http/preferences.service';

@Component({
  selector: 'app-question-prefs',
  templateUrl: './question-prefs.component.html',
  styleUrls: ['./question-prefs.component.css']
})
export class QuestionPrefsComponent implements OnDestroy {
  @ViewChild('questionTabs') questionTabs!: TabsetComponent;

  activeTab?: TabDirective;
  tableNames: { [key: string]: string } = {};
  activeTabName: string = '';
  questions: QuestionPreferences[] = [];
  form!: FormGroup;
  private subscription: Subscription | undefined;
  payload: string = '';
  originalPayload: string = '';
  changeMade: boolean = false;

  constructor(private preferencesService: PreferencesService, private router: Router,
      private metadataService: MetadataService) {
    // get all tables for tab headers
    this.metadataService.getTableTypeLayout().subscribe(
      tables => {
        tables.forEach(t => {
          this.tableNames[t.label] = t.key;
          if (this.activeTabName == '') this.activeTabName = t.label
        })
        this.getData();
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  // get questions for selected table tab
  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    this.activeTabName = data.heading!;
    this.getData();
  }

  getData() {
    this.changeMade = false;
    const group: any = {};
    this.questions = [];

    this.preferencesService.getQuestionPreferences(this.tableNames[this.activeTabName]).subscribe(
      columns => {
        columns.forEach(
          c => {
            if (c.key !== 'date') {
              group[c.key] = new FormControl(c.isVisible);
              this.questions.push(c);
            }
          }
        )
        this.form = new FormGroup(group);
        this.originalPayload = JSON.stringify(JSON.stringify(this.form!.getRawValue()));
        this.payload = this.originalPayload;
        this.onChange();
      }
    )
  }

  // update preferences for table's questions
  submitForm() {
    var finalPrefs: QuestionPrefDto[] = [];

    Object.keys(this.form.controls).forEach(c => {
      const control = this.form.get(c);

      if (control && control.dirty) {
        const question = this.questions.find(q => q.tableName == this.tableNames[this.activeTabName]
            && q.key == c);
        if (question && question.isVisible != control.value) {
          question.isVisible = control.value;
          finalPrefs.push({questionPreferencesID: question.questionPreferencesID, isVisible: control.value});
        }
      }
    })
    if (finalPrefs.length > 0) {
      this.preferencesService.updateQuestionPreferences(finalPrefs).subscribe({
        next: () => this.getData()
      })
    }
  }

  cancelForm() {
    this.getData();
  }

  // on change - compare payload to original payload to determine if changes have been made (if no changes are made, disable submit)
  onChange() {
    // if it makes it here and subscription exists, reset subscription
    if (this.subscription) this.subscription.unsubscribe();
    this.changeMade = false;
    
    this.subscription = this.form!.valueChanges.subscribe(() => {
      this.payload = JSON.stringify(JSON.stringify(this.form!.getRawValue()));
      if (this.payload != this.originalPayload) this.changeMade = true;
      else this.changeMade = false;
    })
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
