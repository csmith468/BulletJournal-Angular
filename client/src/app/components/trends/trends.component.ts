import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';
import { FieldType } from './fieldType';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent {
  data: Array<any> = [];
  dates: Date[] = [];
  pagination: Pagination | undefined;
  source: string = '';  // morning, night, etc
  fields: FieldType[] = [];
  typeDetailsInQuestionSet: string[] = [];
  initialRangeType: string = 'Monthly';
  chart1Visible: boolean = true;
  chart2Visible: boolean = false;
  chart3Visible: boolean = false;
  chart4Visible: boolean = false;
  chart5Visible: boolean = false;

  constructor(private checklistService: ChecklistService, private route: ActivatedRoute) {
    const routeData = this.route.snapshot.data;
    this.source = routeData['metadata']['source'];

    this.checklistService.getQuestions(this.source, routeData['checklist']).subscribe(
      qs => {
        qs.forEach(q => {
          this.fields.push({field: q.key, typeDetail: q.typeDetail});
          if (!this.typeDetailsInQuestionSet.includes(q.typeDetail)) this.typeDetailsInQuestionSet.push(q.typeDetail);
        })
        this.setInitialVisibility();
        console.log(this.typeDetailsInQuestionSet)
      }
    )
  
    this.checklistService.getData(this.source, 1, -1).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.data = <any[]>response.result;
          this.pagination = response.pagination;
          this.fillMissingDates();
          this.data = this.data.sort((a, b) => {
            return a.date.localeCompare(b.date);
          })
        }
      }
    })
  }

  fillMissingDates() {
    if (this.pagination?.minDate && this.pagination.maxDate) {
      var currentDate: any = new Date(this.pagination.minDate);
      var finalDate: any = new Date(this.pagination.maxDate);

      var totalDays = (finalDate - currentDate)/86400000;
      if (totalDays < 120) this.initialRangeType = 'Weekly';
      if (totalDays > 1825) this.initialRangeType = 'Yearly';

      while (currentDate <= finalDate) {
        this.dates.push(new Date(currentDate));

        if (!this.data.find(x => x.date == getDateOnly(currentDate.toString()))) {
          this.data.push({'date' : getDateOnly(currentDate.toString())})
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }

  setInitialVisibility() {
    if (this.typeDetailsInQuestionSet.length >= 2) this.chart2Visible = true;
    if (this.typeDetailsInQuestionSet.length >= 3) this.chart3Visible = true;
    if (this.typeDetailsInQuestionSet.length >= 4) this.chart4Visible = true;
    if (this.typeDetailsInQuestionSet.length >= 5) this.chart5Visible = true;
  }
}
