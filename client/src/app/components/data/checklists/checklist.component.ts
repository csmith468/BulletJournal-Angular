import { Component } from '@angular/core';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';
import { FormGroupComponent } from '../../form-group/form-group.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-checklists',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  providers: [ChecklistService],
  imports: [FormGroupComponent, AsyncPipe, CommonModule]
})
export class ChecklistComponent {
  questions: QuestionBase<any>[] | undefined;
  payload: string = '';
  mode: string = "add";
  type: string = "";

  constructor(private checklistService: ChecklistService, private router: Router, private route: ActivatedRoute) {
    const routeData = this.route.snapshot.data;
    this.type = routeData['type'];

    if (routeData['checklist']) this.mode = 'edit';

    this.checklistService.getQuestions(this.type, routeData['checklist']).subscribe({
      next: q => this.questions = q
    })
  }

  cancelForm() {
    this.router.navigateByUrl('/tables/' + this.type);
  }

}
