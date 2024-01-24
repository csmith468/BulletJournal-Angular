import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NightChecklist } from '../../models/data-models/nightChecklist';
import { PaginatedResult } from '../../models/data-models/pagination';
import { NightTable } from '../../models/data-models/nightTable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, of } from 'rxjs';
import { SwitchQuestion, createSwitchQuestion } from '../../models/form-models/switchQuestion';
import { QuestionBase } from '../../models/form-models/questionBase';
import { DateQuestion, createDateQuestion } from '../../models/form-models/dateQuestion';

@Injectable({
  providedIn: 'root'
})
export class NightService {
  baseUrl = environment.apiUrl;
  nightChecklists: NightChecklist[] = [];
  paginatedResultNight: PaginatedResult<NightTable[]> = new PaginatedResult<NightTable[]>;

  constructor(private http: HttpClient) { 
  }
  addNightChecklist(model: any) {
    return this.http.post(this.baseUrl + 'checklist/addNight', model);
  }


  getNightTable(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<NightTable[]>(this.baseUrl + 'checklist/getMyNightChecklists',
      {observe: 'response', params}).pipe(map(
        response => {
          if (response.body) this.paginatedResultNight.result = response.body;
          const pagination = response.headers.get('Pagination');
          if (pagination) this.paginatedResultNight.pagination = JSON.parse(pagination);
          return this.paginatedResultNight;
        }
      ))
  }



  getQuestions(night?: NightChecklist) {
    const questions: QuestionBase<any>[] = [
      createDateQuestion('date', 'Date', true),
      createSwitchQuestion('glassOfWater', 'Did you have a glass of water?'),
      createSwitchQuestion('meds', 'Did you take your meds?'),
      createSwitchQuestion('vitamins', 'Did you take your vitamins?'),
      createSwitchQuestion('washFace', 'Did you wash your face?'),
      createSwitchQuestion('floss', 'Did you floss?'),
      createSwitchQuestion('checkEmails', 'Did you check your emails?'),
      createSwitchQuestion('checkTexts', 'Did you check your texts?'),
      createSwitchQuestion('mouthguard', 'Did you wear your retainer/mouthguard?'),
      createSwitchQuestion('fruits', 'Did you eat fruit?'),
      createSwitchQuestion('vegetables', 'Did you eat vegetables?'),
      createSwitchQuestion('read', 'Did you read?'),
      createSwitchQuestion('wentOutside', 'Did you go outside?')
    ];

    return of(questions); //.sort((a, b) => a.order - b.order));
  }
}
