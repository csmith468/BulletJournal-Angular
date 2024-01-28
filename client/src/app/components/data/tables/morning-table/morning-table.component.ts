import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MorningChecklist } from 'src/app/helpers/models/data-models/morningChecklist';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { MorningService } from 'src/app/helpers/services/form-sets/morning.service';

@Component({
  selector: 'app-morning-table',
  templateUrl: './morning-table.component.html',
  styleUrls: ['./morning-table.component.css']
})
export class MorningTableComponent implements OnInit {
  morningTable: Array<MorningChecklist> = [];
  pagination: Pagination | undefined;
  columns: Array<keyof MorningChecklist> = ['date',  'glassOfWater',  'meds', 'vitamins', 'breakfast']
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
          this.morningTable = <MorningChecklist[]>response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  editChecklist(row: MorningChecklist) {
    this.router.navigateByUrl('/checklists/morning/edit/' + row.morningChecklistID.toString());
  }

  deleteChecklist(row: MorningChecklist) {
    this.morningService.deleteMorningChecklist(row.morningChecklistID).subscribe({
      next: () => this.loadData()
    });
  }

  pageChanged(page: any) {
    this.pageNumber = page;
    this.loadData();
  }
}
