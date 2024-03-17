import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChecklistTypePrefDto, ChecklistTypePreferences } from 'src/app/models/data-models/checklistTypePreferences';
import { PreferencesService } from 'src/app/services/http/preferences.service';

@Component({
  selector: 'app-checklist-type-prefs',
  templateUrl: './checklist-type-prefs.component.html',
  styleUrls: ['./checklist-type-prefs.component.css']
})
export class ChecklistTypePrefsComponent implements OnDestroy {
  checklistTypes: ChecklistTypePreferences[] = [];
  form!: FormGroup;
  private subscription: Subscription | undefined;
  payload: string = '';
  originalPayload: string = '';
  changeMade: boolean = false;

  headers: ChecklistTypePreferences[] = [];
  items: ChecklistTypePreferences[] = [];
  subItems: ChecklistTypePreferences[] = [];

  constructor(private preferencesService: PreferencesService, private router: Router, private formBuilder: FormBuilder) {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  getData() {
    this.changeMade = false;
    this.form = this.formBuilder.group({});
    this.checklistTypes = [];

    this.preferencesService.getChecklistTypePreferences().subscribe(
      checklists => {
        this.headers = checklists.filter(ct => ct.isHeader);
        this.items = checklists.filter(ct => !ct.isHeader && !ct.category);
        this.subItems = checklists.filter(ct => !ct.isHeader && ct.category);
        
        this.createForm(checklists);
      }
    )
  }

  createForm(checklists: ChecklistTypePreferences[]) {
    checklists.forEach(
      c => {
        this.form.addControl(c.key, new FormControl(c.isVisible));
        this.checklistTypes.push(c);
      }
    )
    // disable subitems when header is not visible
    this.headers.filter(ct => !ct.isVisible).forEach(header => this.updateSubItemsFromHeader(header.key, header.isVisible!));

    this.originalPayload = JSON.stringify(JSON.stringify(this.form!.getRawValue()));
    this.payload = this.originalPayload;
    this.onChange();
  }

  getSubItems(headerKey: string) {
    return this.subItems.filter(si => si.category.toLowerCase() === headerKey.toLowerCase());
  }

  onHeaderChange(event: any) {
    this.updateSubItemsFromHeader(event.target.id, event.target.checked);
  }

  updateSubItemsFromHeader(headerKey: string, checked: boolean) {
    this.subItems.forEach(subItem => {
      if (subItem.category.toLowerCase() == headerKey.toLowerCase() && this.form.get(subItem.key)) {
        if (checked) this.form.get(subItem.key)!.enable();
        else this.form.get(subItem.key)!.disable();
      }
    })
  }

  onSubItemChange(event: any, headerKey: string) {
    // if all subitems are unchecked, uncheck and disable header
    let noSubItemsChecked = true;
    if (!event.target.checked) {
      this.subItems.forEach(subItem => {
        if (subItem.category.toLowerCase() == headerKey && this.form.get(subItem.key)) {
          if (this.form.get(subItem.key)?.value == true) 
            noSubItemsChecked = false;
        }
      })
      if (noSubItemsChecked && this.form.get(headerKey)){
        this.form.get(headerKey)!.setValue(false);
        this.form.get(headerKey)!.disable();
      }
    }

    // if header and subitems were all unchecked and you check a subitem, it will also check and re-enable the header
    if (event.target.checked && this.form.get(headerKey) && this.form.get(headerKey)!.disabled) {
      this.form.get(headerKey)!.setValue(true);
      this.form.get(headerKey)!.enable();
    }
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
