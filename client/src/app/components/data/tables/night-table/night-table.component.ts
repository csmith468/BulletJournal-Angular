import { Component, OnInit } from '@angular/core';
import { NightTable } from 'src/app/helpers/models/nightTable';
import { Pagination } from 'src/app/helpers/models/pagination';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';

@Component({
  selector: 'app-night-table',
  templateUrl: './night-table.component.html',
  styleUrls: ['./night-table.component.css']
})
export class NightTableComponent implements OnInit {
  nightTable: NightTable[] = [];
  pagination: Pagination | undefined;
  columns: Array<keyof NightTable> = ['date',  'glassOfWater',  'meds', 'vitamins', 'washFace', 'floss', 
    'checkEmails', 'checkTexts', 'mouthguard']
  pageNumber = 1;
  pageSize = 15;

  constructor(private checklistService: ChecklistService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.checklistService.getNightChecklist(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        console.log(<NightTable>(response.result!.at(0)))
        if (response.result && response.pagination) {
          this.nightTable = <NightTable[]>response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

}
