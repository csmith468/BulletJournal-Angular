import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { UserQuestionPreferences } from 'src/app/helpers/models/data-models/userQuestionPreferences';
import { AccountService } from 'src/app/helpers/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // @ViewChild('profileTabs', {static: true}) profileTabs?: TabsetComponent; //if you want to set tab with route
  activeTab?: TabDirective;
  tableNames: string[] = ['Morning', 'Night', 'Daily', 'Wellbeing', 'Physical Symptoms', 'Spending', 'Sleep'];
  activeTabName: string = 'Morning';
  questions: UserQuestionPreferences[] = [];
  form!: FormGroup;

  constructor(private accountService: AccountService) {
    this.accountService.changeUserQuestionPreferencesSource(this.activeTabName);
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

    this.accountService.getUserQuestionPreferences(this.activeTabName).subscribe(
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
