import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, of } from 'rxjs';
import { ChecklistEntry } from '../models/data-models/checklistEntry';
import { PaginatedResult } from '../models/data-models/pagination';
import { QuestionBase } from '../models/form-models/questionBase';
import { createDateQuestion } from '../models/form-models/dateQuestion';
import { createSwitchQuestion } from '../models/form-models/switchQuestion';
import { QuestionSet } from '../models/form-models/questionSet';
import { createTextboxQuestion } from '../models/form-models/textboxQuestion';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  baseUrl = environment.apiUrl;
  table: any[] = [];
  type: string = '';
  paginatedResult: PaginatedResult<any[]> = new PaginatedResult<any[]>;

  constructor(private http: HttpClient) { }

  addEntry(type: string, model: any) {
    return this.http.post(this.baseUrl + type + '/add', model);
  }

  updateEntry(type: string, model: any, id:number) {
    return this.http.put(this.baseUrl + type + '/updateById/' + id.toString(), model);
  }

  getTable(type: string, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<any[]>(this.baseUrl + type + '/getMyChecklists',
      {observe: 'response', params}).pipe(map(
        response => {
          if (response.body) this.paginatedResult.result = response.body;
          const pagination = response.headers.get('Pagination');
          if (pagination) this.paginatedResult.pagination = JSON.parse(pagination);
          return this.paginatedResult;
        }
      ))
  }

  getEntryById(type: string, id: string) {
    return this.http.get<any>(this.baseUrl + type + 'g/getMyChecklistById/' + id);
  }

  deleteEntry(type: string, id: string) {
    return this.http.delete(this.baseUrl + type + '/delete/' + id.toString());
  }

  getColumns(type: string) {
    var columns = ['Date'];
    this.http.get<QuestionSet[]>(this.baseUrl + type + '/getQuestionSet').subscribe(
      qs => qs.forEach(q => columns.push(q.key))
    );
    return columns;
  }

  getChecklistById(type: string, id: string) {
    return this.http.get<any>(this.baseUrl + type + '/getMyChecklistById/' + id);
  }

  getQuestions(type: string, initialChecklist?: any) {
    var questions: QuestionBase<any>[] = [
      createDateQuestion('date', 'Date', true, initialChecklist)
    ]

    this.http.get<QuestionSet[]>(this.baseUrl + type + '/getQuestionSet').subscribe(
      qs => {
        qs.forEach(q => {
          if (q.type == 'switch') questions.push(createSwitchQuestion(q.key, q.question, initialChecklist))
          if (q.type == 'textbox') questions.push(createTextboxQuestion(q.key, q.question, initialChecklist))
        })
      }
    )
    return of(questions); // .sort((a, b) => a.order - b.order));
  }
}
