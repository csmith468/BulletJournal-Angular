import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorningChecklistComponent } from './morning-checklist/morning-checklist.component';
import { NightChecklistComponent } from './night-checklist/night-checklist.component';
import { MorningFormComponent } from './morning-form/morning-form.component';
import { NightFormComponent } from './night-form/night-form.component';

const routes: Routes = [
  {path: 'morning', component: MorningChecklistComponent},
  {path: 'night', component: NightChecklistComponent},
  {path: 'morning2', component: MorningFormComponent},
  {path: 'night2', component: NightFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
