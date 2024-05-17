import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Question_Chart } from 'src/app/models/question-models/question_chart';
import { QuestionKind } from 'src/app/models/question-models/questionKind';


@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private addedQuestionSource = new Subject<{question: Question_Chart, chartNumber: number}>();
  private removedQuestionSource = new Subject<{question: Question_Chart, chartNumber: number}>();
  private resetChartSource = new Subject<{selectedQuestions: Question_Chart[], selectedQuestionKind: QuestionKind, 
    aggregation: string, chartNumber: number}>();
  private chartVisibilitySource = new Subject<{isVisible: boolean, chartNumber: number}>();
  private filterVisibilitySource = new Subject<{isVisible: boolean}>();

  constructor() { }

  addedQuestion$ = this.addedQuestionSource.asObservable();
  removedQuestion$ = this.removedQuestionSource.asObservable();
  resetChart$ = this.resetChartSource.asObservable();
  chartVisibility$ = this.chartVisibilitySource.asObservable();
  filterVisibility$ = this.filterVisibilitySource.asObservable();

  emitAddedQuestion(question: Question_Chart, chartNumber: number) {
    this.addedQuestionSource.next({question, chartNumber});
  }

  emitRemovedQuestion(question: Question_Chart, chartNumber: number) {
    this.removedQuestionSource.next({question, chartNumber});
  }

  emitResetChart(selectedQuestions: Question_Chart[], selectedQuestionKind: QuestionKind, 
    aggregation: string, chartNumber: number) 
  {
    this.resetChartSource.next({selectedQuestions, selectedQuestionKind, aggregation, chartNumber});
  }

  updateChartVisibility(isVisible: boolean, chartNumber: number) {
    this.chartVisibilitySource.next({isVisible, chartNumber});
  }

  updateFilterVisibility(isVisible: boolean) {
    this.filterVisibilitySource.next({isVisible});
    // Make apex chart think the window resized so it will resize the chart to fit
    window.dispatchEvent(new Event('resize'));
  }
}
