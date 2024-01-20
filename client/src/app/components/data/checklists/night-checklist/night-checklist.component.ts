import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';
import { NightChecklist } from 'src/app/helpers/models/nightChecklist';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';

@Component({
  selector: 'app-night-checklist',
  templateUrl: './night-checklist.component.html',
  styleUrls: ['./night-checklist.component.css']
})
export class NightChecklistComponent implements OnInit {
  nightChecklist = new NightChecklist();
  bsConfig: Partial<BsDatepickerConfig> | undefined;

  constructor(private checklistService: ChecklistService, private router: Router) {
    this.bsConfig = {
      containerClass: 'theme-default',
      dateInputFormat: 'MMMM DD, YYYY'
    }
  }

  ngOnInit(): void {
  }

  submitNightChecklist() {
    const values = { ...this.nightChecklist, 
      Date: getDateOnly(this.nightChecklist.date.toString())
    };
    this.checklistService.addNightChecklist(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/checklists');
      }
    });
  };

}
