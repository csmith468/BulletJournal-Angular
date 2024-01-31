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
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      title: {
        text: this.selectedField,
        align: "center"
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        min: 0,
        title: {
          text: this.selectedField
        }
      },
      xaxis: { type: "datetime" },
      tooltip: {
        shared: false,
        y: {
          formatter: function(val) {
            return (val / 1000000).toFixed(0);
          }
        }
      }
    }
  }

}

