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
    this.type = routeData['type'];
    
    if (routeData['checklist']) {
      this.mode = 'edit';
      this.checklistService.getQuestions(this.type, routeData['checklist']).subscribe({
        next: q => this.questions = q
      })
    } else {
      this.checklistService.getQuestions(this.type).subscribe({
        next: q => this.questions = q
      })
    }
  }

  ngOnInit(): void {
  }

  cancelForm() {
    this.router.navigateByUrl('/tables/' + this.type);
  }

  getSubmittedFormData(data:string) {
    this.payload = data;
    if (this.mode == 'add') this.addMorningChecklist();
    else this.updateMorningChecklist();
  }


  addMorningChecklist() {
    this.checklistService.addEntry(this.type, this.payload).subscribe({
      next: () => {
        this.router.navigateByUrl('/tables/' + this.type);
      }
    });
  }

  updateMorningChecklist() {
    var id = this.route.snapshot.data[this.type].morningChecklistID;
    this.checklistService.updateEntry(this.type, this.payload, id).subscribe({
      next: () => {
        this.router.navigateByUrl('/tables/' + this.type);
      }
    })
  }

  
}
