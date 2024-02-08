import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TablePrefDto, TablePreferences } from 'src/app/helpers/models/data-models/tablePreferences';
import { AccountService } from 'src/app/helpers/services/account.service';

@Component({
  selector: 'app-table-prefs',
  templateUrl: './table-prefs.component.html',
  styleUrls: ['./table-prefs.component.css']
})
export class TablePrefsComponent implements OnDestroy {
  checklists: TablePreferences[] = [];
  tableNames: { [key: string]: string } = {'Morning': 'morning', 'Night': 'night', 'Daily': 'daily', 'Wellbeing': 'wellbeing', 
    'Physical Symptoms': 'physical', 'Spending': 'spending', 'Sleep': 'sleep'};
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

  getData() {
    this.changeMade = false;
    const group: any = {};
    this.checklists = [];

    this.accountService.getTablePreferences().subscribe(
      checklists => {
        checklists.forEach(
          c => {
            group[c.tableName] = new FormControl(c.isTableVisible);
            this.checklists.push(c);
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
    var finalPrefs: TablePrefDto[] = [];

    Object.keys(this.form.controls).forEach(c => {
      const control = this.form.get(c);

      if (control && control.dirty) {
        const checklist = this.checklists.find(q => q.tableName == c);
        if (checklist && checklist.isTableVisible != control.value) {
          checklist.isTableVisible = control.value;
          finalPrefs.push({tablePreferencesID: checklist.tablePreferencesID, isTableVisible: control.value});
        }
      }
    })
    if (finalPrefs.length > 0) {
      this.accountService.updateTablePreferences(finalPrefs).subscribe({
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
}
