import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormGroupComponent } from 'src/app/components/form-group/form-group.component';
import { MorningChecklist } from 'src/app/helpers/models/data-models/morningChecklist';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { MorningService } from 'src/app/helpers/services/form-sets/morning.service';

@Component({
  standalone: true,
  selector: 'app-morning-form',
  templateUrl: './morning-form.component.html',
  styleUrls: ['./morning-form.component.css'],
  providers: [MorningService],
  imports: [FormGroupComponent, AsyncPipe]
})
export class MorningFormComponent {
  questions$: Observable<QuestionBase<any>[]>;
  morningChecklist: MorningChecklist | undefined;
  payload:string = "";

  constructor(private morningService: MorningService, private router: Router) {
    // this.morningChecklist = this.morningService.getMorningFormById(11);
    this.questions$ = morningService.getQuestions();
  }

  getData(data:string) {
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
