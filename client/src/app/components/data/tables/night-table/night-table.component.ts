import { Component, OnInit } from '@angular/core';
import { NightEntry } from 'src/app/helpers/models/data-models/nightEntry';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { NightService } from 'src/app/helpers/services/form-sets/night.service';

@Component({
  selector: 'app-night-table',
  templateUrl: './night-table.component.html',
  styleUrls: ['./night-table.component.css']
})
export class NightTableComponent implements OnInit {
  nightTable: NightEntry[] = [];
  pagination: Pagination | undefined;
  columns: Array<keyof NightEntry> = ['date',  'glassOfWater',  'meds', 'vitamins', 'washFace', 'floss', 
    'checkEmails', 'checkTexts', 'mouthguard']
  pageNumber = 1;
  pageSize = 15;

  constructor(private nightService: NightService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.nightService.getNightTable(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.nightTable = <NightEntry[]>response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

}
