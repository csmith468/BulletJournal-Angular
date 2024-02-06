import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, baseChartOptions } from '../chartOptions';
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
  @Input() fieldTypeDetail: string = '';
  @Input() aggregation: string = 'Monthly';
  @Input() chartNumber: number = 0;

  dateAxis: any[] = [];
  chartData: FieldValues[] = [];

  chartOptions: Partial<ChartOptions> | undefined;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.createSubscriptions();
    this.startCreation();
  }

  // create data for each field, then create chart
  startCreation() {
    for (const field of this.selectedFields) {
      this.initializeChartData(field); 
    }
    this.createChart();
  }

  // create data for field
  initializeChartData(field: string) {
    var dataTemp: any[] = [];

    // if rating, use value, if yes/no, true = 1, false = 0
    if (this.fieldTypeDetail === 'Rating' || this.fieldTypeDetail === 'Large Numbers' || this.fieldTypeDetail === 'Money'
      || this.fieldTypeDetail === 'Money' || this.fieldTypeDetail === 'Hours') {
      this.data.forEach(q => {
        dataTemp.push([new Date(q.date), (q[field] ? q[field] : null)])
      })
    } else if (this.fieldTypeDetail === 'Yes/No') {
      this.data.forEach(q => {
        var value = (q[field] != null) ? ((q[field] == true) ? 1 : 0) : null;
        dataTemp.push([new Date(q.date), value]);
      })
    }

    // aggregate by time period
    dataTemp = this.aggregate(dataTemp, field);

    // create date axis if not existing
    if (this.dateAxis.length == 0) 
      this.dateAxis.push(dataTemp.map(dates => dates[0]));
    
    this.chartData.push({name: field, data: dataTemp.map(values => values[1])});
  }
  
  // aggregate by month/year
  aggregate(data: any[], field: string) {
    const groupedData: { [range: string]: { sum: number; count: number } } = {};

    data.forEach(([date, value]) => {
      var range = date.toISOString().substring(0, 7); // Monthly by default
      if (this.aggregation == 'Yearly') range = date.getFullYear().toString();
      if (this.aggregation == 'Weekly') {
        var weekNumber = this.getWeekNumber(date);
        range = `Week ${weekNumber}, ${date.getFullYear()}`;
      }

      if (!groupedData[range]) {
        groupedData[range] = { sum: 0, count: 0 };
      }
      if (value != null) {
        groupedData[range].sum += value;
        groupedData[range].count += 1;
      }
    });

    const averages: { range: string; average: number | null }[] = [];
    for (const range in groupedData) {
      const { sum, count } = groupedData[range];
      const average = count === 0 ? null : sum / count;
      averages.push({ range, average });
    }

    return averages.map(({ range, average }) => [range, average]);
  }

  createSubscriptions() {
    this.chartService.addedField$.subscribe(event => {
      if (event.chartNumber === this.chartNumber) 
        this.addField(event.field);
    });
    this.chartService.removedField$.subscribe(event => {
      if (event.chartNumber === this.chartNumber) 
        this.removeField(event.field);
    });
    this.chartService.resetChart$.subscribe(event => {
      if (event.chartNumber === this.chartNumber) {
        this.selectedFields = event.selectedFields;
        this.fieldTypeDetail = event.fieldType;
        this.aggregation = event.aggregation;
        this.dateAxis = [];
        this.chartData = [];
        this.chartOptions = undefined;

        this.startCreation();
      }
    });
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

  createChart() {
    var tooltip_x_format = "MM DD YYYY"
    if (this.aggregation == 'Monthly') tooltip_x_format = "MMMM yyyy" 
    if (this.aggregation == 'Yearly') tooltip_x_format = "yyyy" 
    
    this.chartOptions = {
      ...baseChartOptions,
      series: this.chartData,
      chart: {
        height: baseChartOptions.chart.height,
        type: "area",
        stacked: false,
        zoom: baseChartOptions.chart.zoom,
        toolbar: baseChartOptions.chart.toolbar
      },
      markers: { size: 0.5 },
      stroke: { curve: "smooth" },
      xaxis: {
        type: (this.aggregation == 'Monthly') ? "datetime" : "category",
        categories: this.dateAxis[0]
      },
      tooltip: {
        shared: true,
        x: { format: tooltip_x_format }
      },
    }

    this.setChartColors();
    
    if ((this.fieldTypeDetail === 'Yes/No')) this.createChartYesNo();
    if ((this.fieldTypeDetail === 'Rating')) this.createChartRatingHours();
    if ((this.fieldTypeDetail === 'Hours')) this.createChartRatingHours();
    if ((this.fieldTypeDetail === 'Large Numbers')) this.createChartLargeNumbers();
    if ((this.fieldTypeDetail === 'Money')) this.createChartMoney();
  }

  createChartYesNo() {
    this.chartOptions!.yaxis = {
      min: 0,
      max: 1,
      labels: {
        formatter: function(value) {
          return (value*100).toFixed(0) + '%';
        }
      }
    }
    this.chartOptions!.tooltip!.y = {
      formatter: function(value) {
        return (value*100).toFixed(0) + '%';
      }
    }
  }

  createChartRatingHours() {
    this.chartOptions!.yaxis = {
      min: 0,
      max: (this.fieldTypeDetail === 'Rating') ? 10 : 12, // make 12 into max of all within type
      labels: {
        formatter: function(value) {
          return (value).toFixed(0);
        }
      }
    }
    this.chartOptions!.tooltip!.y = {
      formatter: function(value) {
        return (value).toFixed(2);
      }
    }
  }

  createChartLargeNumbers() {
    this.chartOptions!.yaxis = {
      min: 0,
      max: 10000, // make max of all within type
      labels: {
        formatter: function(value) {
          return (value).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      }
    }
    this.chartOptions!.tooltip!.y = {
      formatter: function(value) {
        return (value).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
  }
  
  createChartMoney() {
    this.chartOptions!.yaxis = {
      min: 0,
      max: 150, // make max of all within type
      labels: {
        formatter: function(value) {
          return (value).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      }
    }
    this.chartOptions!.tooltip!.y = {
      formatter: function(value) {
        return (value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
  }

  setChartColors() {
    if (this.chartNumber === 1) this.chartOptions!.colors = ['#f396c0', '#a1d354', '#ffa000', '#20c997', '#e83e8c', '#51c8ee'];
    if (this.chartNumber === 2) this.chartOptions!.colors = ['#a1d354', '#ffa000', '#20c997', '#e83e8c', '#51c8ee', '#f396c0'];
    if (this.chartNumber === 3) this.chartOptions!.colors = ['#ffa000', '#20c997', '#e83e8c', '#51c8ee', '#f396c0', '#a1d354'];
    if (this.chartNumber === 4) this.chartOptions!.colors = ['#20c997', '#e83e8c', '#51c8ee', '#f396c0', '#a1d354', '#ffa000'];
    if (this.chartNumber === 5) this.chartOptions!.colors = ['#e83e8c', '#51c8ee', '#f396c0', '#a1d354', '#ffa000', '#20c997'];
  }

  getWeekNumber(date: Date): number {
    const d: any = new Date(date);
    const yearStart: any = new Date(d.getFullYear(), 0, 1); 
    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
  }
}

