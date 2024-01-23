import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroupComponent } from 'src/app/components/form-group/form-group.component';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { NightService } from 'src/app/helpers/services/form-sets/night.service';

@Component({
  standalone: true,
  selector: 'app-night-form',
  templateUrl: './night-form.component.html',
  styleUrls: ['./night-form.component.css'],
  providers: [NightService],
  imports: [FormGroupComponent, AsyncPipe]
})
export class NightFormComponent {
  questions$: Observable<QuestionBase<any>[]>;
  payload: string = "";

  constructor(private nightService: NightService, private router: Router) {
    this.questions$ = nightService.getQuestions();
  }

  getData(data: string) {
    this.payload = data;
    this.submitNightChecklist();
  }

  submitNightChecklist() {
    this.nightService.addNightChecklist(this.payload).subscribe({
      next: () => {
        this.router.navigateByUrl('/checklists');
      }
    })
  }
}
