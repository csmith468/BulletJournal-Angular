import { Component } from '@angular/core';
import { CompletedChecklists } from 'src/app/helpers/models/data-models/completedChecklists';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  completedChecklists: CompletedChecklists[] = [];

  constructor(private checklistService: ChecklistService) {
    this.checklistService.getCompletedToday().subscribe(
      c => {
        this.completedChecklists = c;
        console.log(this.completedChecklists);
      }
    );
  }
}
