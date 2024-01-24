import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroupComponent } from 'src/app/components/form-group/form-group.component';
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
export class MorningFormComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]> | undefined;
  morningEntry: MorningEntry | undefined;
  payload: string = "";
  mode: string = "add";

  constructor(private morningService: MorningService, private router: Router, private route: ActivatedRoute) {
    if (this.route.snapshot.data['morning']) {
      this.questions$ = this.morningService.getQuestions(this.route.snapshot.data['morning']);
    } else {
      this.questions$ = this.morningService.getQuestions();
    }
  }

  ngOnInit(): void {
  }

  getSubmittedFormData(data:string) {
    this.payload = data;
    this.submitMorningEntry();
  }


  submitMorningEntry() {
    this.morningService.addMorningEntry(this.payload).subscribe({
      next: () => {
        this.router.navigateByUrl('/tables/morning');
      }
    });
  };
}
