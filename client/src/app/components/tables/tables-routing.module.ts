import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorningTableComponent } from './morning-table/morning-table.component';
import { NightTableComponent } from './night-table/night-table.component';

const routes: Routes = [
  {path: 'morning', component: MorningTableComponent},
  {path: 'night', component: NightTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
