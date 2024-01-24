import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private nightService: NightService, private router: Router, private route: ActivatedRoute) {
    console.log(this.route.snapshot.data['night'])
    if (this.route.snapshot.data['night']) {
      this.questions$ = this.nightService.getQuestions(this.route.snapshot.data['night']);
    } else {
      this.questions$ = this.nightService.getQuestions();
    }
  }

  getSubmittedFormData(data: string) {
    this.payload = data;
    this.submitNightEntry();
  }

  submitNightEntry() {
    this.nightService.addNightEntry(this.payload).subscribe({
      next: () => {
        this.router.navigateByUrl('/checklists');
      }
    })
  }
}
