import { Component, HostListener, Input, OnInit } from '@angular/core';

import { Question_Chart } from 'src/app/models/question-models/question_chart';
import { QuestionKind } from 'src/app/models/question-models/questionKind';
import { ChartService } from 'src/app/services/components/chart.service';

import { ChartOptions, baseChartOptions } from '../chartOptions';

export type QuestionValues = {
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
  @Input() selectedQuestions: Question_Chart[] = [];
  @Input() selectedQuestionKind: QuestionKind | undefined;
  @Input() aggregation: string = 'Monthly';
  @Input() chartNumber: number = 0;

  dateAxis: any[] = [];
  chartData: QuestionValues[] = [];
  minValue: number = 0;
  maxValue: number = 0;

  chartOptions: Partial<ChartOptions> | undefined;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.createSubscriptions();
    this.startCreation();
  }

  // create data for each question, then create chart
  startCreation() {
    for (const question of this.selectedQuestions) {
      this.initializeChartData(question); 
    }
    this.createChart();
  }

  // create data for question
  initializeChartData(question: Question_Chart) {
    var dataTemp: any[] = [];

    // if rating, use value, if yes/no, true = 1, false = 0
    if (this.selectedQuestionKind!.kindDetail === 'Yes/No') {
      this.data.forEach(q => {
        var value = (q[question.key] != null) ? ((q[question.key] == true) ? 1 : 0) : null;
        dataTemp.push([new Date(q.date), value]);
        this.maxValue = 1;
      })
    } else {
      this.data.forEach(q => {
        if (q[question.key] && q[question.key] < this.minValue) this.minValue = q[question.key];
        if (q[question.key] && q[question.key] > this.maxValue) this.maxValue = q[question.key];
        dataTemp.push([new Date(q.date), (q[question.key] != null ? q[question.key] : null)])
      })
    }

    // aggregate by time period
    dataTemp = this.aggregate(dataTemp);

    // create date axis if not existing
    if (this.dateAxis.length == 0) {
      this.dateAxis.push(dataTemp.map(dates => dates[0]));
    }
    
    this.chartData.push({name: question.label, data: dataTemp.map(values => values[1])});
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
    // Subscribe to if a question is added and add the question
    this.chartService.addedQuestion$.subscribe(event => {
      if (event.chartNumber === this.chartNumber) {
        this.addQuestion(event.question);
      }
    });
    // Subscribe to if a question is removed and remove the question
    this.chartService.removedQuestion$.subscribe(event => {
      if (event.chartNumber === this.chartNumber) {
        this.removeQuestion(event.question);
      }
    });
    // Reset all aspects of the chart (when question type or range type changes)
    this.chartService.resetChart$.subscribe(event => {
      if (event.chartNumber === this.chartNumber) {
        this.selectedQuestions = event.selectedQuestions;
        this.selectedQuestionKind = event.selectedQuestionKind;
        this.aggregation = event.aggregation;
        this.dateAxis = [];
        this.chartData = [];
        this.chartOptions = undefined;

        this.startCreation();
      }
    });
  }

  removeQuestion(question: Question_Chart) {
    this.selectedQuestions = this.selectedQuestions.filter(sq => sq !== question);
    this.chartData = this.chartData.filter(data => data.name !== question.label);
    this.createChart();
  }

  addQuestion(question: Question_Chart) {
    this.selectedQuestions.push(question);
    this.initializeChartData(question);
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
        toolbar: baseChartOptions.chart.toolbar,
        redrawOnParentResize: baseChartOptions.chart.redrawOnParentResize,
        redrawOnWindowResize: baseChartOptions.chart.redrawOnWindowResize,
        animations: baseChartOptions.chart.animations
      },
      markers: { size: 5 },
      stroke: { curve: "smooth" },
      xaxis: {
        type: (this.aggregation == 'Monthly') ? "datetime" : "category",
        categories: this.dateAxis[0]
      },
      tooltip: {
        shared: true,
        x: { format: tooltip_x_format },
        y: { formatter: (value: number) => { return this.formatNumber(value, 'Label'); }}
      },
      yaxis: {
        // If min value is in question type, use that, otherwise use min(or 0 if lesser)/max value in data
        min: (this.selectedQuestionKind && this.selectedQuestionKind.minValue) ? this.selectedQuestionKind.minValue : this.minValue,
        max: (this.selectedQuestionKind && this.selectedQuestionKind.maxValue) ? this.selectedQuestionKind.maxValue : this.maxValue,
        labels: {
          formatter: (value: number) => { return this.formatNumber(value, 'Axis'); }
        }
      },
    }
    this.setChartColors();
  }

  // Format number based on type and if percentage (TODO: currency)
  formatNumber(num: number, type: string) {
    if (this.selectedQuestionKind && this.selectedQuestionKind.isPercentage) num *= 100;

    // QuestionType has different properties for the number of decimal places for the y-label vs y-axis
    const getDecimalPlaces = (prop: string): number => {
      const key = prop as keyof QuestionKind;
      return ((this.selectedQuestionKind && this.selectedQuestionKind[key]) ? (this.selectedQuestionKind[key] as number) : 0);
    }

    const formattedNum = num.toLocaleString(undefined, {
      minimumFractionDigits: getDecimalPlaces(`minDecimalPlacesY${type}`),
      maximumFractionDigits: getDecimalPlaces(`maxDecimalPlacesY${type}`)
    })

    return formattedNum + ((this.selectedQuestionKind && this.selectedQuestionKind.isPercentage) ? '%' : '');
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

