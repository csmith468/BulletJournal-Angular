import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../chartOptions';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent {
  chartOptions: Partial<ChartOptions> | undefined;
  data: Array<any> = [];
  values: any[] = [];
  dates: Date[] = [];
  pagination: Pagination | undefined;
  type: string = 'wellbeing';
  chartData: any[] = [];
  updateOptionsData: {} = {};
  // @ViewChild("chart", { static: false }) chart: ChartComponent;
  // chartOptions: Partial<ChartOptions>;
  activeOptionButton:string = "all";

  constructor(private checklistService: ChecklistService) {
    this.checklistService.getData(this.type, 1, -1).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.data = <any[]>response.result;
          this.pagination = response.pagination;

          // this.initializeChartData('happiness');
          // this.initializeChart();
          // this.setUpdateOptions();
        }
      }
    })
  }

  initializeChartData(field: string) {
    if (this.pagination?.minDate && this.pagination.maxDate) {
      var currentDate = new Date(this.pagination.minDate);
      var finalDate = new Date(this.pagination.maxDate);

      while (currentDate <= finalDate) {{
        this.dates.push(new Date(currentDate));

        var value = this.data.find(x => x.date == getDateOnly(currentDate.toString()));
        if (value) this.values.push(value[field])
        else this.values.push(null) 

        this.chartData.push([new Date(currentDate), (value) ? value[field] : null]);

        currentDate.setDate(currentDate.getDate() + 1);
      }}
    }
  }
  
  initializeChart() {
    this.chartOptions = {
      series: [ { data: this.chartData } ],
      chart: { type: "area", height: 350 },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      xAxis: {
        type: "datetime",
        tickAmount: 6
      },
      tooltip: {
        x: { format: "MMM, dd yyyy" }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    }
  }

  setUpdateOptions() {
    this.updateOptionsData = {
      "30 days": {
        xaxis: {
          min: this.getStartDateInRange('30d'),
          max: new Date(this.pagination!.maxDate)
        }
      },
      "60 days": {
        xaxis: {
          min: this.getStartDateInRange('60d'),
          max: new Date(this.pagination!.maxDate)
        }
      },
      "90 days": {
        xaxis: {
          min: this.getStartDateInRange('90d'),
          max: new Date(this.pagination!.maxDate)
        }
      },
      "180 days": {
        xaxis: {
          min: this.getStartDateInRange('180d'),
          max: new Date(this.pagination!.maxDate)
        }
      },
      "1 year": {
        xaxis: {
          min: this.getStartDateInRange('1y'),
          max: new Date(this.pagination!.maxDate)
        }
      },
      all: {
        xaxis: {
          min: new Date(this.pagination!.minDate),
          max: new Date(this.pagination!.maxDate)
        }
      }
    };
  }

  // public updateOptions(option: any): void {
  //   this.activeOptionButton = option;
  //   this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  // }

  getStartDateInRange(range: string) {
    var dt = new Date();
    if (range = '30d') return dt.setDate(dt.getDate() - 30);
    if (range = '60d') return dt.setDate(dt.getDate() - 60);
    if (range = '90d') return dt.setDate(dt.getDate() - 90);
    if (range = '180d') return dt.setDate(dt.getDate() - 180);
    if (range = '1y') return dt.setDate(dt.getDate() - 365);
    return dt;
  }

}
