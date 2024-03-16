import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/models/data-models/pagination';
import { ChecklistService } from 'src/app/services/http/checklist.service';
import { DateQuestion, createDateQuestionParams } from '../form-questions/date-picker/dateQuestion';
import { DatePickerComponent } from '../form-questions/date-picker/date-picker.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GetDateType } from 'src/app/helpers/functions/getDateTypeFn';
import { MetadataService } from 'src/app/services/http/metadata.service';
import { Question_Table } from 'src/app/models/question-models/question_table';
import { PaginationComponent } from '../layout/pagination/pagination.component';

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePickerComponent, PaginationModule, PaginationComponent]
})
export class TableComponent implements OnInit, OnDestroy {
  table: Array<any> = [];
  pagination: Pagination | undefined;
  questions: Question_Table[] = []
  pageNumber = 1;
  pageSize = 10;
  source: string = '';
  header: string = 'Data';
  loading = false;

  dateForm!: FormGroup;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  startDateInput: DateQuestion | undefined;
  endDateInput: DateQuestion | undefined;
  datePayload = '';
  originalDatePayload = '';
  private dateSubscription: Subscription | undefined;

  changeMadeDate = false;
  validDateRange = true;
  validDateInput = true;
  settingDateRange = false;
  changingPage = false;
  

  constructor(private checklistService: ChecklistService, private router: Router, 
      private route: ActivatedRoute, metadataService: MetadataService) {
    this.source = this.route.snapshot.data['metadata']['source'];
    metadataService.getTableQuestions(this.source).subscribe(
        qs => this.questions = qs
    );
    this.header = this.route.snapshot.data['metadata']['header'] + ' Data';
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.dateSubscription) this.dateSubscription.unsubscribe();
  }

  loadData() {
    var minDateParam = this.dateForm ? this.dateForm!.getRawValue().startDate : null;
    var maxDateParam = this.dateForm ? this.dateForm!.getRawValue().endDate : null;
    if (this.settingDateRange) this.pageNumber = 1;
    this.checklistService.getTableData(this.source, this.pageNumber, this.pageSize, minDateParam, maxDateParam).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          console.log(response.pagination)
          this.table = <any[]>response.result;
          this.pagination = response.pagination;
          this.minDate = GetDateType(this.pagination.minDate);
          this.maxDate = GetDateType(this.pagination.maxDate);
          if (!this.changingPage) this.createDateForm();
          if (this.changingPage == true){
            this.changingPage = false;
          }
          if (this.settingDateRange == true){
            this.settingDateRange = false;
          }
        }
      }
    })
  }

  createDateForm() {
    this.startDateInput = createDateQuestionParams(
      'startDate', 'Start Date', false, 1, GetDateType(this.pagination!.minDateInRange)
    );
    this.endDateInput = createDateQuestionParams(
      'endDate', 'End Date', false, 2, GetDateType(this.pagination!.maxDateInRange)
    );

    // this.startDateInput.value = GetDateType(this.pagination!.minDateInRange);
    // this.endDateInput.value = GetDateType(this.pagination!.maxDateInRange);

    const group: any = {};

    group['startDate'] = new FormControl(this.startDateInput.value);
    group['endDate'] = new FormControl(this.endDateInput.value);

    this.dateForm = new FormGroup(group);
    this.originalDatePayload = JSON.stringify(JSON.stringify(this.dateForm!.getRawValue()));
    this.createDateFormChangeSubscription();
  }

  createDateFormChangeSubscription() {
    // if it makes it here and subscription exists, reset subscription
    if (this.dateSubscription) this.dateSubscription.unsubscribe();
    this.changeMadeDate = false;

    this.dateSubscription = this.dateForm!.valueChanges.subscribe(() => {
      this.datePayload = JSON.stringify(JSON.stringify(this.dateForm!.getRawValue()));
      if (this.datePayload != this.originalDatePayload) this.changeMadeDate = true;
      else this.changeMadeDate = false;

      this.validDateInput = (this.dateForm!.getRawValue().startDate != undefined && this.dateForm!.getRawValue().endDate != undefined)
      this.validDateRange = (this.dateForm!.getRawValue().startDate <= this.dateForm!.getRawValue().endDate);
    })
  }

  pageChanged(event: number) {
    if (!this.settingDateRange) {
      this.changingPage = true;
      if (this.pageNumber !== event) {
        this.pageNumber = event;
        this.loadData();
      }
    }
  }

  setDateRange() {
    this.settingDateRange = true;
    this.loadData();
  }

  editEntry(row: any) {
    this.router.navigateByUrl('/checklists/'+ this.source + '/edit/' + row.id.toString());
  }

  deleteEntry(row: any) {
    this.checklistService.deleteEntry(this.source, row.id).subscribe({
      next: () => {
        // If the item is the last on the page, go to the previous page
        var p = this.pagination!;
        if ((p.currentPage == p.totalPages && p.currentPage != 1) && 
          (p.itemsPerPage - ((p.currentPage * p.itemsPerPage) % p.totalItems) == 1)) {
            this.pageNumber = this.pageNumber - 1;
          }
        this.loadData()
      }
    });
  }


}
