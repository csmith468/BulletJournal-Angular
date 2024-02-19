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
  private readonly subscription = new Subscription();
  payload: string = '';
  originalPayload: string = '';
  changeMade: boolean = false;

  constructor(private preferencesService: PreferencesService, private router: Router,
      private metadataService: MetadataService) {
    this.metadataService.getMyTables().subscribe(
      tables => {
        tables.forEach(t => {
          this.tableNames[t.displayName] = t.key;
          if (this.activeTabName == '') this.activeTabName = t.displayName
        })
        this.getData();
      }
    )
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
    this.changeMade = false;
    const group: any = {};
    this.questions = [];

    this.preferencesService.getQuestionPreferences(this.tableNames[this.activeTabName]).subscribe(
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
    var finalPrefs: QuestionPrefDto[] = [];

    Object.keys(this.form.controls).forEach(c => {
      const control = this.form.get(c);

      if (control && control.dirty) {
        const question = this.questions.find(q => q.tableName == this.tableNames[this.activeTabName]
            && q.columnName == c);
        if (question && question.isColumnVisible != control.value) {
          question.isColumnVisible = control.value;
          finalPrefs.push({questionPreferencesID: question.questionPreferencesID, isColumnVisible: control.value});
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
