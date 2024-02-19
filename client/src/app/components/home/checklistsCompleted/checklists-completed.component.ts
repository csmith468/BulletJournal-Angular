import { Component } from '@angular/core';
import { CompletedChecklists } from 'src/app/models/data-models/completedChecklists';
import { ChecklistService } from 'src/app/services/http/checklist.service';

@Component({
  selector: 'app-checklists-completed',
  templateUrl: './checklists-completed.component.html',
  styleUrls: ['./checklists-completed.component.css']
})
export class ChecklistsCompletedComponent {
  completedChecklists: CompletedChecklists[] = [];

  constructor(private checklistService: ChecklistService) {
    // this.checklistService.getCompletedToday().subscribe(
    //   c => {
    //     this.completedChecklists = c;
    //   }
    // );
  }
}
