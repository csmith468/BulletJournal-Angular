import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TableTypeLayout } from 'src/app/models/data-models/tableTypeLayout';
import { ChartQuestion } from 'src/app/models/question-models/chartQuestion';
import { ChecklistQuestion } from 'src/app/models/question-models/checklistQuestion';
import { QuestionKind } from 'src/app/models/question-models/questionKind';
import { TableQuestion } from 'src/app/models/question-models/tableQuestion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTableTypeLayout() {
    return this.http.get<TableTypeLayout[]>(this.baseUrl + 'metadata/getTableTypeLayout').pipe(map(
      tables => {
        return tables.map(table => {
          if (table.category) {
            // If the table has a category, update the displayName
            table.label = table.category + ' ' + table.label;
          }
          return table;
        }).filter(table => !table.isHeader);
      }
    ))
  }

  getQuestionKindById(questionKindId: number) {
    return this.http.get<QuestionKind>(this.baseUrl + 'static/getQuestionKindById/' + questionKindId.toString());
  }


  getChecklistQuestions(type: string) {
    return this.http.get<ChecklistQuestion[]>(this.baseUrl + 'metadata/' + type + '/getChecklistQuestions');
  }


  getChartQuestions(type: string) {
    return this.http.get<ChartQuestion[]>(this.baseUrl + 'metadata/' + type + '/getChartQuestions');
  }

  getChartQuestionsByKind(type: string, questionKindId: number) {
    return this.http.get<ChartQuestion[]>(
      this.baseUrl + 'metadata/' + type + '/getChartQuestionsByKind/' + questionKindId.toString()
    );
  }

  getTableQuestions(type: string) {
    return this.http.get<TableQuestion[]>(this.baseUrl + 'metadata/' + type + '/getTableQuestions');
  }

}
