import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TabDirective } from 'ngx-bootstrap/tabs';
import { QuestionPreferences } from 'src/app/models/data-models/questionPreferences';
import { PreferencesService } from 'src/app/services/http/preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  // @ViewChild('profileTabs', {static: true}) profileTabs?: TabsetComponent; //if you want to set tab with route
  activeTab?: TabDirective;
  activeTabName: string = '';
  questions: QuestionPreferences[] = [];
  form!: FormGroup;

  constructor(private preferencesService: PreferencesService) {
    this.preferencesService.changeQuestionPreferencesSource(this.activeTabName);
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    this.activeTabName = data.heading!;
    // this.getData();

    // if (this.activeTab.heading === 'Messages') {
  }

  // getData() {
  //   const group: any = {};
  //   this.form = new FormGroup(group);

  //   this.preferencesService.getQuestionPreferences(this.activeTabName).subscribe(
  //     columns => {
  //       columns.forEach(
  //         c => {
  //           group[c.key] = new FormControl(c.key);
  //           this.questions.push(c);
  //         }
  //       )
  //       this.form = new FormGroup(group);
  //     }
  //   )
  // }
}
