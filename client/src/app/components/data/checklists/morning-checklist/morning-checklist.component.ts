import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MorningChecklist } from 'src/app/helpers/models/morningChecklist';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';
import { Router } from '@angular/router';
import { MorningService } from 'src/app/helpers/services/form-sets/morning.service';

@Component({
  selector: 'app-morning-checklist',
  templateUrl: './morning-checklist.component.html',
  styleUrls: ['./morning-checklist.component.css']
})
export class MorningChecklistComponent implements OnInit {
  @ViewChild('morningForm') morningForm: NgForm | undefined;
  morningChecklist = new MorningChecklist();
  bsConfig: Partial<BsDatepickerConfig> | undefined;

  constructor(private morningService: MorningService, private router: Router) {
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
    this.morningService.addMorningChecklist(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/checklists');
      }
    });
  };

  
}
