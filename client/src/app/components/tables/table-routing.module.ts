import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorningTableComponent } from './morning-table/morning-table.component';
import { NightTableComponent } from './night-table/night-table.component';
import { typeResolver } from 'src/app/helpers/resolvers/type.resolver';

const routes: Routes = [
  {path: 'morning', component: MorningTableComponent, resolve: {metadata: typeResolver}},
  {path: 'night', component: NightTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
