import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Tables } from 'src/app/models/data-models/tables';
import { QuestionSet } from 'src/app/models/question-models/questionSet';
import { QuestionType } from 'src/app/models/question-models/questionType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getQuestions(type: string) {
    return this.http.get<QuestionSet[]>(this.baseUrl + 'metadata/' + type + '/getQuestionSet');
  }

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

  getChartQuestionTypes() {
    return this.http.get<QuestionType[]>(this.baseUrl + 'metadata/getChartQuestionTypes');
  }

  getQuestionTypeByLabel(typeDetail: string) {
    return this.http.get<QuestionType>(this.baseUrl + 'metadata/getQuestionTypeByLabel/' + typeDetail);
  }
}
