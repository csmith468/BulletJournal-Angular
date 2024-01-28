import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorningFormComponent } from './morning-form/morning-form.component';
import { NightFormComponent } from './night-form/night-form.component';
import { nightFormResolver } from 'src/app/helpers/resolvers/night-form.resolver';
import { checklistResolver } from 'src/app/helpers/resolvers/checklist.resolver';
import { typeResolver } from 'src/app/helpers/resolvers/type.resolver';

const routes: Routes = [
  {path: ':type/edit/:id', component: MorningFormComponent, resolve: {metadata: typeResolver, checklist: checklistResolver}},
  {path: ':type/add', component: MorningFormComponent, resolve: {metadata: typeResolver}},
  {path: 'night/edit/:id', component: NightFormComponent, resolve: {night: nightFormResolver}},
  {path: 'night/add', component: NightFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistRoutingModule { }
