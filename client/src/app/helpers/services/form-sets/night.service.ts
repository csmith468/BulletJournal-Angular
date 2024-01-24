import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../../models/data-models/pagination';
import { NightEntry } from '../../models/data-models/nightEntry';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, of } from 'rxjs';
import { createSwitchQuestion } from '../../models/form-models/switchQuestion';
import { QuestionBase } from '../../models/form-models/questionBase';
import { createDateQuestion } from '../../models/form-models/dateQuestion';

@Injectable({
  providedIn: 'root'
})
export class NightService {
  baseUrl = environment.apiUrl;
  paginatedResultNight: PaginatedResult<NightEntry[]> = new PaginatedResult<NightEntry[]>;

  constructor(private http: HttpClient) { 
  }
  addNightEntry(model: any) {
    return this.http.post(this.baseUrl + 'checklist/addNight', model);
  }


  getNightTable(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<NightEntry[]>(this.baseUrl + 'checklist/getMyNightChecklists',
      {observe: 'response', params}).pipe(map(
        response => {
          if (response.body) this.paginatedResultNight.result = response.body;
          const pagination = response.headers.get('Pagination');
          if (pagination) this.paginatedResultNight.pagination = JSON.parse(pagination);
          return this.paginatedResultNight;
        }
      ))
  }

  getNightEntryById(id: string) {
    return this.http.get<NightEntry>(this.baseUrl + 'checklist/getMyNightChecklistById/' + id);
  }

  getQuestions(night?: NightEntry) {
    const questions: QuestionBase<any>[] = [
      createDateQuestion('date', 'Date', true, night),
      createSwitchQuestion('glassOfWater', 'Did you have a glass of water?', night),
      createSwitchQuestion('meds', 'Did you take your meds?', night),
      createSwitchQuestion('vitamins', 'Did you take your vitamins?', night),
      createSwitchQuestion('washFace', 'Did you wash your face?', night),
      createSwitchQuestion('floss', 'Did you floss?', night),
      createSwitchQuestion('checkEmails', 'Did you check your emails?', night),
      createSwitchQuestion('checkTexts', 'Did you check your texts?', night),
      createSwitchQuestion('mouthguard', 'Did you wear your retainer/mouthguard?', night),
      createSwitchQuestion('fruits', 'Did you eat fruit?', night),
      createSwitchQuestion('vegetables', 'Did you eat vegetables?', night),
      createSwitchQuestion('read', 'Did you read?', night),
      createSwitchQuestion('wentOutside', 'Did you go outside?', night)
    ];

    return of(questions); //.sort((a, b) => a.order - b.order));
  }
}
