import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Morning } from 'src/app/helpers/models/data-models/morning';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { MorningService } from 'src/app/helpers/services/form-sets/morning.service';

@Component({
  selector: 'app-morning-table',
  templateUrl: './morning-table.component.html',
  styleUrls: ['./morning-table.component.css']
})
export class MorningTableComponent implements OnInit {
  morningTable: Array<Morning> = [];
  pagination: Pagination | undefined;
  columns: Array<keyof Morning> = ['date',  'glassOfWater',  'meds', 'vitamins', 'breakfast']
  pageNumber = 1;
  pageSize = 10;

  constructor(private morningService: MorningService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.morningService.getMorningTable(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.morningTable = <Morning[]>response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  editChecklist(row: Morning) {
    this.router.navigateByUrl('/checklists/morning/edit/' + row.morningID.toString());
  }

  deleteChecklist(row: Morning) {
    this.morningService.deleteMorningChecklist(row.morningID).subscribe({
      next: () => this.loadData()
    });
  }

  pageChanged(page: any) {
    this.pageNumber = page;
    this.loadData();
  }
}
