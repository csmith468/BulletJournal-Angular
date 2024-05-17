import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

import { ChecklistComponent } from 'src/app/components/checklist/checklist.component';

import { ConfirmService } from '../../services/components/confirm.service';

export const unsavedChangesChecklistGuard: CanDeactivateFn<ChecklistComponent> = (component) => {
  const confirmService = inject(ConfirmService);

  if (component.changeMade && component.form.dirty && !component.saving) {
    return confirmService.confirm('Unsaved Changes', 
      'Are you sure you want to continue? Any unsaved changes will be lost.');
  }
  return true;
};

// export const unsavedChangesTablePrefsGuard: CanDeactivateFn<TablePrefsComponent> = (component) => {
//   if (component.changeMade && component.form.dirty) {
//     return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
//   }
//   return true;
// };

// export const unsavedChangesQuestionPrefsGuard: CanDeactivateFn<QuestionPrefsComponent> = (component) => {
//   if (component.changeMade && component.form.dirty) {
//     return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
//   }
//   return true;
// };