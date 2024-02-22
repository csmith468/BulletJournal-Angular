import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QuestionKind } from 'src/app/models/question-models/questionKind';
import { Question_Chart } from 'src/app/models/question-models/question_chart';


@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private addedQuestionSource = new Subject<{question: Question_Chart, chartNumber: number}>();
  private removedQuestionSource = new Subject<{question: Question_Chart, chartNumber: number}>();
  private resetChartSource = new Subject<{selectedQuestions: Question_Chart[], selectedKindDetail: QuestionKind, 
    aggregation: string, chartNumber: number}>();
  private chartVisibilitySource = new Subject<{isVisible: boolean, chartNumber: number}>();

  constructor() { }

  addedQuestion$ = this.addedQuestionSource.asObservable();
  removedQuestion$ = this.removedQuestionSource.asObservable();
  resetChart$ = this.resetChartSource.asObservable();
  chartVisibility$ = this.chartVisibilitySource.asObservable();

  emitAddedQuestion(question: Question_Chart, chartNumber: number) {
    this.addedQuestionSource.next({question, chartNumber});
  }

  emitRemovedQuestion(question: Question_Chart, chartNumber: number) {
    this.removedQuestionSource.next({question, chartNumber});
  }

  emitResetChart(selectedQuestions: Question_Chart[], selectedKindDetail: QuestionKind, 
    aggregation: string, chartNumber: number) 
  {
    this.resetChartSource.next({selectedQuestions, selectedKindDetail, aggregation, chartNumber});
  }

  updateChartVisibility(isVisible: boolean, chartNumber: number) {
    this.chartVisibilitySource.next({isVisible, chartNumber});
  }
}
