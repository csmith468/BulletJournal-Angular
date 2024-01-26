import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MorningEntry } from '../../models/data-models/morningEntry';
import { PaginatedResult } from '../../models/data-models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, of } from 'rxjs';
import { QuestionBase } from '../../models/form-models/questionBase';
import { createSwitchQuestion } from '../../models/form-models/switchQuestion';
import { createDateQuestion } from '../../models/form-models/dateQuestion';

@Injectable({
  providedIn: 'root'
})
export class MorningService {
  baseUrl = environment.apiUrl;
  morningTable: MorningEntry[] = [];
  paginatedResultMorning: PaginatedResult<MorningEntry[]> = new PaginatedResult<MorningEntry[]>;

  constructor(private http: HttpClient) { }

  addMorningEntry(model: any) {
    return this.http.post(this.baseUrl + 'morning/add', model);
  }

  updateMorningEntry(model: any, id:number) {
    return this.http.put(this.baseUrl + 'morning/updateById/' + id.toString(), model);
  }

  getMorningTable(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<MorningEntry[]>(this.baseUrl + 'morning/getMyChecklists',
      {observe: 'response', params}).pipe(map(
        response => {
          if (response.body) this.paginatedResultMorning.result = response.body;
          const pagination = response.headers.get('Pagination');
          if (pagination) this.paginatedResultMorning.pagination = JSON.parse(pagination);
          return this.paginatedResultMorning;
        }
      ))
  }

  getMorningEntryById(id: string) {
    return this.http.get<MorningEntry>(this.baseUrl + 'morning/getMyChecklistById/' + id);
  }

  getQuestions(morning?: MorningEntry) {
    const questions: QuestionBase<any>[] = [
      createDateQuestion('date', 'Date', true, morning),
      createSwitchQuestion('glassOfWater', 'Did you have a glass of water?', morning),
      createSwitchQuestion('meds', 'Did you take your meds?', morning),
      createSwitchQuestion('vitamins', 'Did you take your vitamins?', morning),
      createSwitchQuestion('breakfast', 'Did you eat breakfast?', morning)
    ];

    return of(questions); // .sort((a, b) => a.order - b.order));
  }
}
