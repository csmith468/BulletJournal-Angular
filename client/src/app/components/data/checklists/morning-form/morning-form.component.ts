import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroupComponent } from 'src/app/components/form-group/form-group.component';
import { QuestionBase } from 'src/app/helpers/models/form-models/questionBase';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';

@Component({
  standalone: true,
  selector: 'app-morning-form',
  templateUrl: './morning-form.component.html',
  styleUrls: ['./morning-form.component.css'],
  providers: [ChecklistService],
  imports: [FormGroupComponent, AsyncPipe, CommonModule]
})
export class MorningFormComponent implements OnInit {
  // questions$: Observable<QuestionBase<any>[]> | undefined;
  questions: QuestionBase<any>[] | undefined;
  payload: string = '';
  mode: string = "add";
  type: string = '';


  constructor(private checklistService: ChecklistService, private router: Router, private route: ActivatedRoute) {
    const routeData = this.route.snapshot.data;
    console.log(routeData['metadata'])
    this.type = routeData['metadata']['type'];

    if (routeData['checklist']) this.mode = 'edit';
    this.checklistService.getQuestions(this.type, routeData['checklist']).subscribe({
      next: q => this.questions = q
    })
  }

  ngOnInit(): void {
  }

  cancelForm() {
    this.router.navigateByUrl('/tables/' + this.type);
  }

  getSubmittedFormData(data:string) {
    this.payload = data;
    var id = this.route.snapshot.data['metadata']['id'];
    this.checklistService.addOrUpdateEntry(this.type, this.payload, id).subscribe({
      next: () => this.router.navigateByUrl('/tables/' + this.type)
    })
  }
}
