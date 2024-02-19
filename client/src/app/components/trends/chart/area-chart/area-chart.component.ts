import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, baseChartOptions } from '../chartOptions';
import { ChartService } from 'src/app/services/components/chart.service';
import { FieldType } from '../../fieldType';
import { QuestionType } from 'src/app/models/question-models/questionKind';
import { MetadataService } from 'src/app/services/http/metadata.service';

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
  @Input() selectedFields: FieldType[] = [];
  @Input() fieldTypeDetail: string = '';
  @Input() aggregation: string = 'Monthly';
  @Input() chartNumber: number = 0;

  dateAxis: any[] = [];
  chartData: FieldValues[] = [];
  questionType: QuestionType | undefined;
  minValue: number = 0;
  maxValue: number = 0;

  chartOptions: Partial<ChartOptions> | undefined;

  constructor(private chartService: ChartService, private metadataService: MetadataService) { }

  ngOnInit(): void {
    this.createSubscriptions();
    this.startCreation();
  }

  // create data for each field, then create chart
  startCreation() {
    for (const field of this.selectedFields) {
      this.initializeChartData(field); 
    }
    this.metadataService.getQuestionTypeByLabel(this.fieldTypeDetail).subscribe(
      qt => {
        this.questionType = qt;
        this.createChart();
      }
    );
  }

  // create data for field
  initializeChartData(field: FieldType) {
    var dataTemp: any[] = [];

    // if rating, use value, if yes/no, true = 1, false = 0
    if (this.fieldTypeDetail === 'Yes/No') {
      this.data.forEach(q => {
        var value = (q[field.key] != null) ? ((q[field.key] == true) ? 1 : 0) : null;
        dataTemp.push([new Date(q.date), value]);
        if (value && value < this.minValue) this.minValue = value;
        if (value && value > this.maxValue) this.maxValue = value;
      })
    } else {
      this.data.forEach(q => {
        dataTemp.push([new Date(q.date), (q[field.key] != null ? q[field.key] : null)])
      })
    }

    // aggregate by time period
    dataTemp = this.aggregate(dataTemp);

    // create date axis if not existing
    if (this.dateAxis.length == 0) {
      this.dateAxis.push(dataTemp.map(dates => dates[0]));
    }
    
    this.chartData.push({name: field.label, data: dataTemp.map(values => values[1])});
  }
  
  // aggregate by month/year
  aggregate(data: any[]) {
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

  // Subscribe to updates from chart component
  createSubscriptions() {
    // Subscribe to if a field is added and add the field
    this.chartService.addedField$.subscribe(event => {
      if (event.chartNumber === this.chartNumber) {
        this.addField(event.field);
      }
    });
    // Subscribe to if a field is removed and remove the field
    this.chartService.removedField$.subscribe(event => {
      if (event.chartNumber === this.chartNumber) {
        this.removeField(event.field);
      }
    });
    // Reset all aspects of the chart (when field type or range type changes)
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

  removeField(field: FieldType) {
    this.selectedFields = this.selectedFields.filter(sf => sf !== field);
    this.chartData = this.chartData.filter(data => data.name !== field.label);
    this.createChart();
  }

  addField(field: FieldType) {
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
      markers: { size: 5 },
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
    this.createChartDetail();
    this.setChartColors();
  }

  createChartDetail() {
    this.chartOptions!.yaxis = {
      // If min value is in question type, use that, otherwise use min(or 0 if lesser)/max value in data
      min: (this.questionType && this.questionType.minValue) ? this.questionType.minValue : this.minValue,
      max: (this.questionType && this.questionType.maxValue) ? this.questionType.maxValue : this.maxValue,
      labels: {
        formatter: (value: number) => { return this.formatNumber(value, 'Label'); }
      }
    }
    this.chartOptions!.tooltip!.y = {
      formatter: (value: number) => { return this.formatNumber(value, 'Axis'); }
    }
  }

  // Format number based on type and if percentage (TODO: currency)
  formatNumber(num: number, type: string) {
    if (this.questionType && this.questionType.isPercentage) num *= 100;

    // QuestionType has different properties for the number of decimal places for the y-label vs y-axis
    const getDecimalPlaces = (prop: string): number => {
      const key = prop as keyof QuestionType;
      return ((this.questionType && this.questionType[key]) ? (this.questionType[key] as number) : 0);
    }

    const formattedNum = num.toLocaleString(undefined, {
      minimumFractionDigits: getDecimalPlaces(`minDecimalPlacesY${type}`),
      maximumFractionDigits: getDecimalPlaces(`maxDecimalPlacesY${type}`)
    })

    return formattedNum + ((this.questionType && this.questionType.isPercentage) ? '%' : '');
  }

  setChartColors() {
    // alternate first color so each graph starts with a different color
    if (this.chartNumber % 6 === 0) this.chartOptions!.colors = ['#f396c0', '#a1d354', '#ffa000', '#20c997', '#e83e8c', '#51c8ee'];
    if (this.chartNumber % 6 === 1) this.chartOptions!.colors = ['#a1d354', '#ffa000', '#20c997', '#e83e8c', '#51c8ee', '#f396c0'];
    if (this.chartNumber % 6 === 2) this.chartOptions!.colors = ['#ffa000', '#20c997', '#e83e8c', '#51c8ee', '#f396c0', '#a1d354'];
    if (this.chartNumber % 6 === 3) this.chartOptions!.colors = ['#20c997', '#e83e8c', '#51c8ee', '#f396c0', '#a1d354', '#ffa000'];
    if (this.chartNumber % 6 === 4) this.chartOptions!.colors = ['#e83e8c', '#51c8ee', '#f396c0', '#a1d354', '#ffa000', '#20c997'];
    if (this.chartNumber % 6 === 5) this.chartOptions!.colors = ['#51c8ee', '#f396c0', '#a1d354', '#ffa000', '#20c997', '#e83e8c'];
  }

  getWeekNumber(date: Date): number {
    const d: any = new Date(date);
    const yearStart: any = new Date(d.getFullYear(), 0, 1); 
    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
  }
}

