import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDateOnly } from 'src/app/helpers/functions/getDateOnlyFn';
import { Pagination } from 'src/app/models/data-models/pagination';
import { ChecklistService } from 'src/app/services/http/checklist.service';
import { ChartService } from 'src/app/services/components/chart.service';
import { MetadataService } from 'src/app/services/http/metadata.service';
import { Question_Chart } from 'src/app/models/question-models/question_chart';
import { QuestionKind } from 'src/app/models/question-models/questionKind';
import { finalize, forkJoin, map, mergeMap, of, switchMap, tap } from 'rxjs';

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
  chartQuestions: Question_Chart[] = [];
  questionKindsInSet: QuestionKind[] = [];
  initialRangeType: string = 'Monthly';
  header: string = '';
  chartVisibility: {chartNumber: number, visibility: string}[] = [];

  constructor(private checklistService: ChecklistService, private chartService: ChartService, 
      private route: ActivatedRoute,  private router: Router, private metadataService: MetadataService) {
    const routeData = this.route.snapshot.data;
    this.source = routeData['metadata']['source'];
    this.header = this.route.snapshot.data['metadata']['header'] + ' Trends';

    // Get all fields to include in charts
    // this.metadataService.getChartQuestions(this.source).subscribe(
    //   qs => {
    //     qs.forEach(q => {
    //         this.chartQuestions.push(q);
    //         if (!this.questionKindsInSet.find(k => k.questionKindID === q.questionKindID)) {
    //           this.metadataService.getQuestionKindById(q.questionKindID).subscribe(
    //             qt => this.questionKindsInSet.push(qt)
    //           );
    //           console.log('here')
    //         }
    //     })
    //     // Set chart visibility for all charts to open initially with one chart per question kind
    //     this.chartVisibility = Array.from({ length: this.questionKindsInSet.length }, (_, index) => ({
    //       chartNumber: index,
    //       visibility: 'open'
    //     }));
    //   }
    // )

    // this.metadataService.getChartQuestions(this.source).pipe(
    //   switchMap(qs => {
    //     const questionObservables = qs.map(q => {
    //       this.chartQuestions.push(q);
    //       if (!this.questionKindsInSet.find(k => k.questionKindID === q.questionKindID)) {
    //         return this.metadataService.getQuestionKindById(q.questionKindID).pipe(
    //           tap(qt => this.questionKindsInSet.push(qt))
    //         );
    //       } else {
    //         return of(null); // Return an observable that emits null for already fetched question kinds
    //       }
    //     });
    
    //     return forkJoin(questionObservables).pipe(
    //       map(() => qs)
    //     );
    //   })
    // ).subscribe(
    //   qs => {
    //     // Set chart visibility for all charts to open initially with one chart per question kind
    //     this.chartVisibility = Array.from({ length: this.questionKindsInSet.length }, (_, index) => ({
    //       chartNumber: index,
    //       visibility: 'open'
    //     }));
    //   }
    //   )
    this.metadataService.getChartQuestions(this.source).pipe(
      mergeMap((qs) => {
        const uniqueQuestionKindIds = new Set<number>();
    
        const observables = qs.map((q) => {
          this.chartQuestions.push(q);
    
          if (!uniqueQuestionKindIds.has(q.questionKindID)) {
            uniqueQuestionKindIds.add(q.questionKindID);
            return this.metadataService.getQuestionKindById(q.questionKindID);
          } else {
            return of(null); // Skip if the question kind ID is already processed
          }
        });
    
        return forkJoin(observables).pipe(
          map((questionKinds) => ({ qs, questionKinds }))
        );
      })
    ).subscribe(
      ({ qs, questionKinds }) => {
        questionKinds.forEach((qt) => {
          if (qt) {
            this.questionKindsInSet.push(qt);
          }
        });
    
        // Set chart visibility for all charts to open initially with one chart per question kind
        this.chartVisibility = Array.from(
          { length: this.questionKindsInSet.length },
          (_, index) => ({
            chartNumber: index,
            visibility: 'open',
          })
        );
      })
  
    // Get all data for chart
    this.checklistService.getTableData(this.source, 1, -1).subscribe({
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

  // Fill in missing dates to x-axis will have every date included in range, regardless of if data exists
  fillMissingDates() {
    if (this.pagination?.minDate && this.pagination.maxDate) {
      var currentDate: any = new Date(this.pagination.minDate);
      var finalDate: any = new Date(this.pagination.maxDate);

      // Set date range for charts initially based on number of days in range
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

  // Remove chart entirely
  closeChart(chartNo: any) {
    this.chartVisibility[chartNo].visibility = 'closed';
  }
  
  // Close all but header of chart but keep chart data available for if maximized
  minimizeChart(chartNo: any) {
    this.chartVisibility[chartNo].visibility = 'minimized';
    this.chartService.updateChartVisibility(false, chartNo);
  }

  openChart(chartNo: any) {
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
    this.router.navigateByUrl('/data/' + this.source);
  }
}
