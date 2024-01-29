import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit { 
  table: Array<any> = [];
  type: string = '';
  pagination: Pagination | undefined;
  columns: Array<keyof any> = [];
  pageNumber = 1;
  pageSize = 10;

  constructor(private checklistService: ChecklistService, private router: Router, private route: ActivatedRoute) {
    const routeData = this.route.snapshot.data;
    this.type = routeData['metadata']['type'];

    this.columns = this.checklistService.getColumns(this.type);
    console.log(this.columns)
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.checklistService.getTable(this.type, this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.table = <any[]>response.result;
          this.pagination = response.pagination;
        }
      }
    })
  } 

}
