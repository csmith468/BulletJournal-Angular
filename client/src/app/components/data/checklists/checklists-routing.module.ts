import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorningFormComponent } from './morning-form/morning-form.component';
import { NightFormComponent } from './night-form/night-form.component';

const routes: Routes = [
  {path: 'morning/edit', component: MorningFormComponent},
  {path: 'morning/add', component: MorningFormComponent},
  {path: 'night/edit', component: NightFormComponent},
  {path: 'night/add', component: NightFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
