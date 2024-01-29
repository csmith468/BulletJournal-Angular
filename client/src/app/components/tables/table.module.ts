import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { ViewDataComponent } from './view-data/view-data.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TableRoutingModule
  ]
})
export class TablesModule { }
