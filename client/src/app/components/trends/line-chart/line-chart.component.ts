import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { getDateOnly } from 'src/app/helpers/getDateOnlyFn';
import { Pagination } from 'src/app/helpers/models/data-models/pagination';
import { ChecklistService } from 'src/app/helpers/services/checklist.service';
import { ChartOptions } from '../chartOptions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  // @Input() commonOptions!: Partial<ChartOptions>;
  @Input() data: Array<any> = [];
  @Input() fields: string[] = [];
  @Input() selectedField: string = '';

  chartOptions: Partial<ChartOptions> | undefined;
  chartData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeChartData();
    this.createChart();
  }

  initializeChartData() {
    this.data.forEach(q => {
      this.chartData.push([new Date(q.date), (q[this.selectedField] ? q[this.selectedField] : null)])
    })
  }

  createChart() {
    this.chartOptions = {
      series: [
        {
          name: this.selectedField,
          data: this.chartData
        }
      ],
      chart: {
        id: this.selectedField,
        group: this.selectedField,
        type: 'line',
        height: 300
      },
      colors: ["#F396C0"],
      yAxis: {
        tickAmount: 1,
        labels: { minWidth: 40 }
      },
      toolbar: { tools: { selection: false }},
      stroke: { curve: "straight" },
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
      xAxis: { type: "datetime" },
      dataLabels: { enabled: false }
    };
  }

}

