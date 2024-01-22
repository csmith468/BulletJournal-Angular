import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormGroupComponent } from 'src/app/components/form-group/form-group.component';
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

  constructor(morningService: MorningService) {
    this.questions$ = morningService.getQuestions();
  }
}
