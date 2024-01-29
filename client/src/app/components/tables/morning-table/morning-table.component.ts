import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';

@Component({
  selector: 'app-morning-table',
  templateUrl: './morning-table.component.html',
  styleUrls: ['./morning-table.component.css']
})
export class MorningTableComponent implements OnInit {
  table: Array<any> = [];
  pagination: Pagination | undefined;
  columns: Array<keyof any> = ['date']
  pageNumber = 1;
  pageSize = 10;
  type: string = ''

  constructor(private checklistService: ChecklistService, private router: Router, private route: ActivatedRoute) {
    this.type = this.route.snapshot.data['metadata']['type'];
    var cols = checklistService.getColumns(this.type).subscribe(
        qs => qs.forEach(q => this.columns.push(q.key))
    );
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

  editEntry(row: any) {
    this.router.navigateByUrl('/checklists/morning/edit/' + row[this.type + 'ID'].toString());
  }

  deleteEntry(row: any) {
    this.checklistService.deleteEntry(this.type, row[this.type + 'ID']).subscribe({
      next: () => this.loadData()
    });
  }

  pageChanged(page: any) {
    this.pageNumber = page;
    this.loadData();
  }
}
