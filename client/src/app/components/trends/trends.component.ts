import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';
import { ChartOptions } from './chart/chartOptions';
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
  type: string = '';  // morning, night, etc
  fields: FieldType[] = [];
  typesInQuestionSet: string[] = [];
  chart1Visible: boolean = true;
  chart2Visible: boolean = false;
  chart3Visible: boolean = false;
  chart4Visible: boolean = false;
  chart5Visible: boolean = false;


  commonOptions: Partial<ChartOptions> = {
    dataLabels: { enabled: false },
    stroke: { curve: "straight" },
    toolbar: { tools: { selection: false }},
    markers: {
      // size: 2,
      hover: { size: 10 }
    },
    tooltip: {
      followCursor: false,
      theme: 'light',
      x: { show: false },
      marker: { show: false },
      y: {
        title: {
          formatter: function() { return ""; }
        }
      }
    },
    grid: { clipMarkers: false },
    xaxis: { type: "datetime" }
  };

  constructor(private checklistService: ChecklistService, private route: ActivatedRoute) {
    const routeData = this.route.snapshot.data;
    this.type = routeData['metadata']['type'];

    this.checklistService.getQuestions(this.type, routeData['checklist']).subscribe(
      qs => {
        qs.forEach(q => {
          this.fields.push({field: q.key, type: q.type});
          if (!this.typesInQuestionSet.includes(q.type)) this.typesInQuestionSet.push(q.type);
        })
        this.setInitialVisibility();
      }
    )
  
    this.checklistService.getData(this.type, 1, -1).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.data = <any[]>response.result;
          this.pagination = response.pagination;
          this.fillMissingDates();
        }
      }
    })
  }

  fillMissingDates() {
    if (this.pagination?.minDate && this.pagination.maxDate) {
      var currentDate = new Date(this.pagination.minDate);
      var finalDate = new Date(this.pagination.maxDate);

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
    if (this.typesInQuestionSet.length >= 2) this.chart2Visible = true;
    if (this.typesInQuestionSet.length >= 3) this.chart3Visible = true;
    if (this.typesInQuestionSet.length >= 4) this.chart4Visible = true;
    if (this.typesInQuestionSet.length >= 5) this.chart5Visible = true;
  }
}
