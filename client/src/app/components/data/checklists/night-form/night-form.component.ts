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
  mode: string = "add";

  constructor(private nightService: NightService, private router: Router, private route: ActivatedRoute) {
    console.log(this.route.snapshot.data['night'])
    if (this.route.snapshot.data['night']) {
      this.mode = 'edit';
      this.questions$ = this.nightService.getQuestions(this.route.snapshot.data['night']);
    } else {
      this.questions$ = this.nightService.getQuestions();
    }
  }

  cancelForm() {
    this.router.navigateByUrl('/tables/night');
  }

  getSubmittedFormData(data: string) {
    this.payload = data;
    if (this.mode == 'add') this.addNightEntry();
    else this.updateNightEntry();
  }

  addNightEntry() {
    this.nightService.addNightEntry(this.payload).subscribe({
      next: () => {
        this.router.navigateByUrl('/tables/night');
      }
    });
  }

  updateNightEntry() {
    var id = this.route.snapshot.data['night'].nightChecklistID;
    this.nightService.updateNightEntry(this.payload, id).subscribe({
      next: () => {
        this.router.navigateByUrl('/tables/night');
      }
    })
  }
}
