import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChecklistTypePrefDto, ChecklistTypePreferences } from 'src/app/models/data-models/checklistTypePreferences';
import { PreferencesService } from 'src/app/services/http/preferences.service';

@Component({
  selector: 'app-table-prefs',
  templateUrl: './table-prefs.component.html',
  styleUrls: ['./table-prefs.component.css']
})
export class TablePrefsComponent implements OnDestroy {
  checklistTypes: ChecklistTypePreferences[] = [];
  form!: FormGroup;
  private subscription: Subscription | undefined;
  payload: string = '';
  originalPayload: string = '';
  changeMade: boolean = false;

  constructor(private preferencesService: PreferencesService, private router: Router) {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  getData() {
    this.changeMade = false;
    const group: any = {};
    this.checklistTypes = [];

    this.preferencesService.getChecklistTypePreferences().subscribe(
      checklists => {
        checklists.forEach(
          c => {
            group[c.key] = new FormControl(c.isVisible);
            this.checklistTypes.push(c);
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
    var finalPrefs: ChecklistTypePrefDto[] = [];

    Object.keys(this.form.controls).forEach(c => {
      const control = this.form.get(c);

      if (control && control.dirty) {
        const checklist = this.checklistTypes.find(q => q.key == c);
        if (checklist && checklist.isVisible != control.value) {
          checklist.isVisible = control.value;
          finalPrefs.push({checklistTypePreferencesID: checklist.checklistTypePreferencesID, isVisible: control.value});
        }
      }
    })
    if (finalPrefs.length > 0) {
      this.preferencesService.updateChecklistTypePreferences(finalPrefs).subscribe({
        next: () => this.getData()
      })
    }
  }

  cancelForm() {
    this.getData();
  }

  //on change - compare payload to original payload
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
}
