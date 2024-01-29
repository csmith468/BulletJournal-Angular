import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';
import { FormGroupComponent } from '../form-group/form-group.component';
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
export class ChecklistComponent implements OnInit, OnDestroy {
  questions: QuestionBase<any>[] | undefined;
  payload: string = '';
  mode: string = 'add';
  type: string = '';


  constructor(private checklistService: ChecklistService, private router: Router, private route: ActivatedRoute) {
    const routeData = this.route.snapshot.data;
    this.type = routeData['metadata']['type'];

    if (routeData['checklist']) this.mode = 'edit';
    this.checklistService.getQuestions(this.type, routeData['checklist']).subscribe({
      next: q => this.questions = q
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    
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
