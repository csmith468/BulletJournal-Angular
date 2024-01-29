import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() columns: Array<keyof any> = [];
  @Input() tableData: Array<any> = [];
  @Input() tableTitle: string = '';
  @Input() pagination: Pagination | undefined;
  // @Input() type: string = '';
  pageNumber = 1;
  pageSize = 15;
  // columns : string[] = [];
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() newPage = new EventEmitter<any>();

  // constructor(private checklistService: ChecklistService) { }

  ngOnInit(): void {
    if (this.pagination) {
      this.pageNumber = this.pagination.currentPage;
      this.pageSize = this.pagination.itemsPerPage;
    }
    // this.columns = this.checklistService.getColumns(this.type);
  }

  onUpdate(row: any) {
    this.update.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  onPageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.newPage.emit(event.page);
    }
  }
}
