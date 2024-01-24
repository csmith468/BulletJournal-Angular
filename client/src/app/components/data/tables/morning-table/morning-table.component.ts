import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MorningEntry } from 'src/app/helpers/models/data-models/morningEntry';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { MorningService } from 'src/app/helpers/services/form-sets/morning.service';

@Component({
  selector: 'app-morning-table',
  templateUrl: './morning-table.component.html',
  styleUrls: ['./morning-table.component.css']
})
export class MorningTableComponent implements OnInit {
  morningTable: MorningEntry[] = [];
  pagination: Pagination | undefined;
  columns: Array<keyof MorningEntry> = ['date',  'glassOfWater',  'meds', 'vitamins', 'breakfast']
  pageNumber = 1;
  pageSize = 15;

  constructor(private morningService: MorningService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.morningService.getMorningTable(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.morningTable = <MorningEntry[]>response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  editChecklist(row: MorningEntry) {
    this.router.navigateByUrl('/checklists/morning/edit/' + row.morningChecklistID.toString());
  }

}
