import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() columns: Array<keyof any> = [];
  @Input() tableData: Array<any> = [];
  @Input() tableTitle: string = '';
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 15;
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onUpdate(row: any) {
    console.log(row)
    this.update.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }
}
