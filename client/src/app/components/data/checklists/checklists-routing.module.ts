import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorningFormComponent } from './morning-form/morning-form.component';
import { NightFormComponent } from './night-form/night-form.component';
import { morningFormResolver } from 'src/app/helpers/resolvers/morning-form.resolver';
import { nightFormResolver } from 'src/app/helpers/resolvers/night-form.resolver';

const routes: Routes = [
  {path: 'morning/edit/:id', component: MorningFormComponent, resolve: {morning: morningFormResolver}},
  {path: 'morning/add', component: MorningFormComponent},
  {path: 'night/edit/:id', component: NightFormComponent, resolve: {night: nightFormResolver}},
  {path: 'night/add', component: NightFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistsRoutingModule { }
