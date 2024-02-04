import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from '../chartOptions';
import { ChartService } from 'src/app/helpers/services/chart.service';

export type FieldValues = {
  name: string;
  data: number[];
}

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {
  @Input() data: Array<any> = [];
  @Input() selectedFields: string[] = [];
  @Input() fieldType: string = 'switch';
  @Input() aggregation: string = 'monthly';

  dates: Date[] = [];
  dateAxis: any[] = [];
  chartData: FieldValues[] = [];

  chartOptions: Partial<ChartOptions> | undefined;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.addedField$.subscribe((field) => this.addField(field));
    this.chartService.removedField$.subscribe((field) => this.removeField(field));

    for (const field of this.selectedFields) {
      this.initializeChartData(field); 
    }
    this.createChart();
  }

  removeField(field: string) {
    this.selectedFields = this.selectedFields.filter(sf => sf !== field);
    this.chartData = this.chartData.filter(data => data.name !== field);
    this.createChart();
  }

  addField(field: string) {
    this.selectedFields.push(field);
    this.initializeChartData(field);
    this.createChart();
  }

  initializeChartData(field: string) {
    var dataTemp: any[] = [];

    if (this.fieldType === 'slider') {
      this.data.forEach(q => {
        dataTemp.push([new Date(q.date), (q[field] ? q[field] : null)])
      })
    } else if (this.fieldType === 'switch') {
      this.data.forEach(q => {
        var value = (q[field] != null) ? ((q[field] == true) ? 1 : 0) : null;
        dataTemp.push([new Date(q.date), value]);
      })
    }

    if (this.aggregation == 'monthly') {
      dataTemp = this.aggregate(dataTemp, field);
    } 

    if (this.dateAxis.length == 0) 
      this.dateAxis.push(dataTemp.map(dates => dates[0]));
    
    this.chartData.push({name: field, data: dataTemp.map(values => values[1])});
  }
  

  aggregate(data: any[], field: string) {
    const groupedData: { [month: string]: { sum: number; count: number } } = {};

    data.forEach(([date, value]) => {
      const month = date.toISOString().substring(0, 7); // Extract year and month
      if (!groupedData[month]) {
        groupedData[month] = { sum: 0, count: 0 };
      }
      if (value != null) {
        groupedData[month].sum += value;
        groupedData[month].count += 1;
      }
    });
    // start with null and count 0, 
    // if value is not null and sum is null then sum = value and count = 1
    // if value is not null and sum is not null then above
    // if value is null and sum is not null then skip

    //actually nvm, start both with 0, but if null then don't add one, 
    // in next section, if count = 0 then average is null
  
    // Calculate averages
    const averages: { month: string; average: number | null }[] = [];
    for (const month in groupedData) {
      const { sum, count } = groupedData[month];
      const average = count === 0 ? null : sum / count;
      averages.push({ month, average });
    }

    return averages.map(({ month, average }) => [month, average]);
  }

  createChart() {
    var tooltip_x_format = "MM DD YYYY"
    if (this.aggregation == 'monthly') {
      tooltip_x_format = "MMMM yyyy" // Set the tooltip format for x-axis
    } 
    var label = (this.fieldType === 'switch') ? 'percentage' : 'number';

    this.chartOptions = {
      series: this.chartData,
      chart: {
        height: 350,
        type: "area",
        stacked: false,
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
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: this.dateAxis[0]
      },
      yaxis: {
        min: 0,
        max: 1,
        labels: {
          formatter: function(value) {
            return (label === 'percentage') ? ((value*100).toFixed(0)) + '%' : ((value).toFixed(0));
          }
        }
      },
      tooltip: {
        shared: false,
        x: {
          format: tooltip_x_format, // Set the tooltip format for x-axis
        },
        y: {
          formatter: function(value) {
            return (label === 'percentage') ? ((value*100).toFixed(0)) + '%' : ((value).toFixed(0));
          }
        }
      }
    }
  };
}

