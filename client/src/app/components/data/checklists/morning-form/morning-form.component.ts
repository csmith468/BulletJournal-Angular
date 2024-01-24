import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { FormGroupComponent } from 'src/app/components/form-group/form-group.component';
import { MorningChecklist } from 'src/app/helpers/models/data-models/morningChecklist';
import { MorningEntry } from 'src/app/helpers/models/data-models/morningEntry';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { MorningService } from 'src/app/helpers/services/form-sets/morning.service';

@Component({
  standalone: true,
  selector: 'app-morning-form',
  templateUrl: './morning-form.component.html',
  styleUrls: ['./morning-form.component.css'],
  providers: [MorningService],
  imports: [FormGroupComponent, AsyncPipe, CommonModule]
})
export class MorningFormComponent implements OnInit, OnDestroy {
  questions$: Observable<QuestionBase<any>[]> | undefined;
  morningChecklist: MorningEntry | undefined;
  payload: string = "";
  mode: string = "add";

  constructor(private morningService: MorningService, private router: Router) {
    // this.morningService.getMorningEntryById('11').subscribe({
    //   next: morning => {
    //     this.morningChecklist = morning;
    //     this.questions$ = this.morningService.getQuestions(this.morningChecklist);
    //   }
    // })
    if (this.router.url.endsWith('edit')) this.mode = 'edit';
    this.morningService.currentMorningEntry$.pipe(take(1)).subscribe({
      next: entry => {
        console.log(entry)
        this.questions$ = this.morningService.getQuestions((entry) ? entry : undefined)
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.morningService.setMorningEntry();
  }

  getSubmittedFormData(data:string) {
    this.payload = data;
    this.submitMorningChecklist();
  }


  submitMorningChecklist() {
    this.morningService.addMorningChecklist(this.payload).subscribe({
      next: () => {
        this.router.navigateByUrl('/checklists');
      }
    });
  };
}
