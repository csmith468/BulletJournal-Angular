import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CompletedChecklists } from 'src/app/models/data-models/completedChecklists';
import { VisibleChecklistType } from 'src/app/models/data-models/visibleChecklistType';
import { Question_Chart } from 'src/app/models/question-models/question_chart';
import { Question_Checklist } from 'src/app/models/question-models/question_checklist';
import { Question_Table } from 'src/app/models/question-models/question_table';
import { QuestionKind } from 'src/app/models/question-models/questionKind';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVisibleChecklistTypes() {
    return this.http.get<VisibleChecklistType[]>(this.baseUrl + 'metadata/getVisibleChecklistTypes');
  }

  getQuestionKindById(questionKindId: number) {
    return this.http.get<QuestionKind>(this.baseUrl + 'static/getQuestionKindById/' + questionKindId.toString());
  }


  getChecklistQuestions(type: string) {
    return this.http.get<Question_Checklist[]>(this.baseUrl + 'metadata/' + type + '/getChecklistQuestions');
  }


  getChartQuestions(type: string) {
    return this.http.get<Question_Chart[]>(this.baseUrl + 'metadata/' + type + '/getChartQuestions');
  }

  getChartQuestionsByKind(type: string, questionKindId: number) {
    return this.http.get<Question_Chart[]>(
      this.baseUrl + 'metadata/' + type + '/getChartQuestionsByKind/' + questionKindId.toString()
    );
  }

  getTableQuestions(type: string) {
    return this.http.get<Question_Table[]>(this.baseUrl + 'metadata/' + type + '/getTableQuestions');
  }

  getCompletedToday() {
    return this.http.get<CompletedChecklists[]>(this.baseUrl + 'metadata/getCompletedToday');
  }

}
