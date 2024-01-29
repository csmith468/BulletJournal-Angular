import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { checklistResolver } from 'src/app/helpers/resolvers/checklist.resolver';
import { typeResolver } from 'src/app/helpers/resolvers/type.resolver';
import { ChecklistComponent } from './checklist.component';

const routes: Routes = [
  {path: ':type/edit/:id', component: ChecklistComponent, resolve: {metadata: typeResolver, checklist: checklistResolver}},
  {path: ':type/add', component: ChecklistComponent, resolve: {metadata: typeResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistRoutingModule { }
