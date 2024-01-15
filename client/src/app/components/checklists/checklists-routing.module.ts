import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorningChecklistComponent } from './morning-checklist/morning-checklist.component';
import { NightChecklistComponent } from './night-checklist/night-checklist.component';

const routes: Routes = [
  {path: 'morning', component: MorningChecklistComponent},
  {path: 'night', component: NightChecklistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
