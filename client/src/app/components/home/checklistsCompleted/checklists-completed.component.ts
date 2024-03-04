import { Component } from '@angular/core';
import { CompletedChecklists } from 'src/app/models/data-models/completedChecklists';
import { ChecklistService } from 'src/app/services/http/checklist.service';
import { MetadataService } from 'src/app/services/http/metadata.service';

@Component({
  selector: 'app-checklists-completed',
  templateUrl: './checklists-completed.component.html',
  styleUrls: ['./checklists-completed.component.css']
})
export class ChecklistsCompletedComponent {
  completedChecklists: CompletedChecklists[] = [];

  constructor(private metadataService: MetadataService) {
    this.metadataService.getCompletedToday().subscribe(
      c => {
        this.completedChecklists = c;
        console.log(c)
      }
    );
  }
}
