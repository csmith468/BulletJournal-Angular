import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Tables } from 'src/app/models/data-models/tables';
import { ChartQuestion } from 'src/app/models/question-models/chartQuestion';
import { ChecklistQuestion } from 'src/app/models/question-models/checklistQuestion';
import { QuestionKind } from 'src/app/models/question-models/questionKind';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMyTables() {
    return this.http.get<Tables[]>(this.baseUrl + 'metadata/getMyTables').pipe(map(
      tables => {
        return tables.map(table => {
          if (table.category) {
            // If the table has a category, update the displayName
            table.displayName = table.category + ' ' + table.displayName;
          }
          return table;
        }).filter(table => !table.isHeader);
      }
    ))
  }

  getQuestionKindById(questionKindId: number) {
    return this.http.get<QuestionKind>(this.baseUrl + 'static/getQuestionKindById' + questionKindId.toString());
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

}
