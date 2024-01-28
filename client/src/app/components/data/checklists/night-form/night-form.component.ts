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
  type: string = 'night';
  payload: string = "";
  mode: string = "add";

  constructor(private nightService: NightService, private router: Router, private route: ActivatedRoute) {
    if (this.route.snapshot.data[this.type]) {
      this.mode = 'edit';
      this.questions$ = this.nightService.getQuestions(this.route.snapshot.data[this.type]);
    } else {
      this.questions$ = this.nightService.getQuestions();
    }
  }

  cancelForm() {
    this.router.navigateByUrl('/tables/night');
  }

  getSubmittedFormData(data: string) {
    this.payload = data;
    if (this.mode == 'add') this.addNightChecklist();
    else this.updateNightChecklist();
  }

  addNightChecklist() {
    this.nightService.addNightChecklist(this.payload).subscribe({
      next: () => {
        this.router.navigateByUrl('/tables/night');
      }
    });
  }

  updateNightChecklist() {
    var id = this.route.snapshot.data['night'].nightChecklistID;
    this.nightService.updateNightChecklist(this.payload, id).subscribe({
      next: () => {
        this.router.navigateByUrl('/tables/night');
      }
    })
  }
}
