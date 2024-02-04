import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from 'src/app/helpers/services/chart.service';

export type ChartSeries = {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
};

@Component({
  selector: 'app-area-chart-ngx',
  templateUrl: './area-chart-ngx.component.html',
  styleUrls: ['./area-chart-ngx.component.css']
})
export class AreaChartNgxComponent  implements OnInit{
  @Input() data: Array<any> = [];
  @Input() selectedFields: string[] = [];
  @Input() fieldType: string = 'switch';
  @Input() aggregation: string = 'monthly';

  chartData: ChartSeries[] = [];

  // public colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  // xAxisLabel: string = 'Year';
  // yAxisLabel: string = 'Population';
  timeline: boolean = true;
  // view: [number, number] = [700, 300];

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.addedField$.subscribe((field) => this.addField(field));
    this.chartService.removedField$.subscribe((field) => this.removeField(field));
    // this.aggregation = ''
    for (const field of this.selectedFields) {
      this.initializeChartData(field); 
    }
  }

  initializeChartData(field: string) {
    var dataTemp: any[] = [];

    if (this.fieldType == 'slider') {
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

    const chartSeries: ChartSeries = {
      name: field,
      series: dataTemp.map((data: [string, number]) => ({
        name: data[0],
        value: data[1],
      })),
    };
    this.chartData.push(chartSeries);
  }


  aggregate(data: any[], field: string) {
    const groupedData: { [month: string]: { sum: number; count: number } } = {};

    data.forEach(([date, value]) => {
      const month = date.toISOString().substring(0, 7); // Extract year and month
      if (!groupedData[month]) {
        groupedData[month] = { sum: 0, count: 0 };
      }
      groupedData[month].sum += value;
      groupedData[month].count += 1;
    });
  
    // Calculate averages
    const averages: { month: string; average: number }[] = [];
    for (const month in groupedData) {
      const { sum, count } = groupedData[month];
      const average = count === 0 ? 0 : sum / count;
      averages.push({ month, average });
    }

    var listData:any[] = averages.map(({ month, average }) => [month, average]);
    return listData;
  }


  removeField(field: string) {
    this.selectedFields = this.selectedFields.filter(sf => sf !== field);
    this.chartData = this.chartData.filter(data => data.name !== field);
  }

  addField(field: string) {
    this.selectedFields.push(field);
    this.initializeChartData(field);
  }

}
