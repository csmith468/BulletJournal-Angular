import { Component, OnInit } from '@angular/core';
import { MorningTable } from 'src/app/helpers/models/morningTable';
import { Pagination } from 'src/app/helpers/models/pagination';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';

@Component({
  selector: 'app-morning-table',
  templateUrl: './morning-table.component.html',
  styleUrls: ['./morning-table.component.css']
})
export class MorningTableComponent implements OnInit {
  morningTable: MorningTable[] = [];
  pagination: Pagination | undefined;
  columns: Array<keyof MorningTable> = ['date',  'glassOfWater',  'meds', 'vitamins', 'breakfast']
  pageNumber = 1;
  pageSize = 15;

  constructor(private checklistService: ChecklistService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.checklistService.getMorningChecklist(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        console.log(<MorningTable>(response.result!.at(0)))
        if (response.result && response.pagination) {
          this.morningTable = <MorningTable[]>response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

}
