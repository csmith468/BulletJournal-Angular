import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';
import { FieldType } from './fieldType';
import { ChartService } from 'src/app/helpers/services/chart.service';

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
  header: string = '';
  chartVisibility: {chartNumber: number, visibility: string}[] = [];

  constructor(private checklistService: ChecklistService, private chartService: ChartService, 
      private route: ActivatedRoute,  private router: Router) {
    const routeData = this.route.snapshot.data;
    this.source = routeData['metadata']['source'];
    this.header = this.route.snapshot.data['metadata']['header'] + ' Trends';

    this.checklistService.getQuestions(this.source, routeData['checklist']).subscribe(
      qs => {
        qs.forEach(q => {
          this.fields.push({field: q.key, typeDetail: q.typeDetail});
          if (!this.typeDetailsInQuestionSet.includes(q.typeDetail)) this.typeDetailsInQuestionSet.push(q.typeDetail);
        })
        this.chartVisibility = Array.from({ length: this.typeDetailsInQuestionSet.length }, (_, index) => ({
          chartNumber: index,
          visibility: 'open'
        }));
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

  closeChart(chartNo: any) {
    console.log(`Closing chart ${chartNo}`);
    this.chartVisibility[chartNo].visibility = 'closed';
    console.log(this.chartVisibility)
  }
  
  minimizeChart(chartNo: any) {
    console.log(`Minimizing chart ${chartNo}`);
    this.chartVisibility[chartNo].visibility = 'minimized';
    this.chartService.updateChartVisibility(false, chartNo);
  }

  openChart(chartNo: any) {
    console.log(`Opening chart ${chartNo}`);
    this.chartVisibility[chartNo].visibility = 'open';
    this.chartService.updateChartVisibility(true, chartNo);
  }

  addChart() {
    var newChartNumber = this.chartVisibility.reduce((max, chart) => (
      chart.chartNumber > max ? chart.chartNumber : max
      ), -1) + 1;
    this.chartVisibility.push({chartNumber: newChartNumber, visibility: 'open'});
  }

  viewData() {
    this.router.navigateByUrl('/tables/' + this.source);
  }
}
