import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorningFormComponent } from './morning-form/morning-form.component';
import { NightFormComponent } from './night-form/night-form.component';

const routes: Routes = [
  {path: 'morning', component: MorningFormComponent},
  {path: 'night', component: NightFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
