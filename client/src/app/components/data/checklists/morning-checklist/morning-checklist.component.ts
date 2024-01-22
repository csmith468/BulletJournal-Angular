import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MorningChecklist } from 'src/app/helpers/models/morningChecklist';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';
import { Router } from '@angular/router';

@Component({
  selector: 'app-morning-checklist',
  templateUrl: './morning-checklist.component.html',
  styleUrls: ['./morning-checklist.component.css']
})
export class MorningChecklistComponent implements OnInit {
  @ViewChild('morningForm') morningForm: NgForm | undefined;
  morningChecklist = new MorningChecklist();
  bsConfig: Partial<BsDatepickerConfig> | undefined;

  constructor(private checklistService: ChecklistService, private router: Router) {
    this.bsConfig = {
      containerClass: 'theme-default',
      dateInputFormat: 'MMMM DD, YYYY'
    }
  }

  ngOnInit(): void {
  }

  submitMorningChecklist() {
    const values = {...this.morningChecklist, 
      date: getDateOnly(this.morningChecklist.date.toString())
    };
    this.checklistService.addMorningChecklist(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/checklists');
      }
    });
  };

  
}
