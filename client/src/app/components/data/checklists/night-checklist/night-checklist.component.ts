import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';
import { ChecklistQuestions } from 'src/app/helpers/models/checklistQuestions';
import { NightChecklist } from 'src/app/helpers/models/nightChecklist';
import { NightService } from 'src/app/helpers/services/form-sets/night.service';

@Component({
  selector: 'app-night-checklist',
  templateUrl: './night-checklist.component.html',
  styleUrls: ['./night-checklist.component.css'],
  providers : [{provide : ControlContainer, useExisting : NgForm}]
})
export class NightChecklistComponent implements OnInit {
  @ViewChildren('childForm') childForm!:QueryList<any>;
  nightChecklist = new NightChecklist();
  bsConfig: Partial<BsDatepickerConfig> | undefined;

  questions: ChecklistQuestions[] = [
    { column: 'glassOfWater', question: 'testglass'},
    { column: 'meds', question: 'testmeds'}
  ];

  constructor(private nightService: NightService, private router: Router) {
    this.bsConfig = {
      containerClass: 'theme-default',
      dateInputFormat: 'MMMM DD, YYYY'
    }
  }

  ngOnInit(): void {
    console.log(this.questions)
  }

  submitNightChecklist() {
    const values = { ...this.nightChecklist, 
      date: getDateOnly(this.nightChecklist.date.toString())
    };
    this.nightService.addNightChecklist(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/checklists');
      }
    });
  };

}
