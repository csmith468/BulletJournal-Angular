import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { QuestionPreferences } from 'src/app/helpers/models/data-models/questionPreferences';
import { AccountService } from 'src/app/helpers/services/account.service';
import { SettingsService } from 'src/app/helpers/services/settings.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  // @ViewChild('profileTabs', {static: true}) profileTabs?: TabsetComponent; //if you want to set tab with route
  activeTab?: TabDirective;
  tableNames: string[] = ['Morning', 'Night', 'Daily', 'Wellbeing', 'Physical Symptoms', 'Spending', 'Sleep'];
  activeTabName: string = 'Morning';
  questions: QuestionPreferences[] = [];
  form!: FormGroup;

  constructor(private settingsService: SettingsService) {
    this.settingsService.changeQuestionPreferencesSource(this.activeTabName);
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    this.activeTabName = data.heading!;
    this.getData();

    // if (this.activeTab.heading === 'Messages') {
  }

  getData() {
    const group: any = {};
    this.form = new FormGroup(group);
    
    console.log(this.activeTabName)

    this.settingsService.getQuestionPreferences(this.activeTabName).subscribe(
      columns => {
        columns.forEach(
          c => {
            group[c.columnName] = new FormControl(c.isColumnVisible);
            this.questions.push(c);
          }
        )
        this.form = new FormGroup(group);
      }
    )
  }
}
