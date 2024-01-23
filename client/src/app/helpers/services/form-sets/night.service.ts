import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NightChecklist } from '../../models/nightChecklist';
import { PaginatedResult } from '../../models/pagination';
import { NightTable } from '../../models/nightTable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, of } from 'rxjs';
import { SwitchQuestion } from '../../models/form-models/switchQuestion';
import { QuestionBase } from '../../models/form-models/questionBase';
import { DateQuestion } from '../../models/form-models/dateQuestion';

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


  getNightChecklist(page?: number, itemsPerPage?: number) {
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



  getQuestions() {
    const questions: QuestionBase<string | boolean | Date>[] = [
      new DateQuestion({
        key: 'date',
        label: 'Date',
        value: new Date(),
        required: true,
        order: 0
      }),

      new SwitchQuestion({
        key: 'glassOfWater',
        label: 'Did you have a glass of water?',
        value: false,
        order: 3
      }),

      new SwitchQuestion({
        key: 'meds',
        label: 'Did you take your meds?',
        value: false,
        order: 3
      }),

      new SwitchQuestion({
        key: 'vitamins',
        label: 'Did you take your vitamins?',
        value: false,
        order: 4
      }),

      new SwitchQuestion({
        key: 'washFace',
        label: 'Did you wash your face?',
        value: false,
        order: 5
      }),

      new SwitchQuestion({
        key: 'floss',
        label: 'Did you floss?',
        value: false,
        order: 6
      }),

      new SwitchQuestion({
        key: 'checkEmails',
        label: 'Did you check your emails?',
        value: false,
        order: 7
      }),

      new SwitchQuestion({
        key: 'checkTexts',
        label: 'Did you check your texts?',
        value: false,
        order: 8
      }),

      new SwitchQuestion({
        key: 'mouthguard',
        label: 'Did you wear your retainer/mouthguard?',
        value: false,
        order: 9
      }),

      new SwitchQuestion({
        key: 'fruits',
        label: 'Did you eat fruit?',
        value: false,
        order: 10
      }),

      new SwitchQuestion({
        key: 'vegetables',
        label: 'Did you eat vegetables?',
        value: false,
        order: 11
      }),

      new SwitchQuestion({
        key: 'read',
        label: 'Did you read?',
        value: false,
        order: 12
      }),

      new SwitchQuestion({
        key: 'wentOutside',
        label: 'Did you go outside?',
        value: false,
        order: 13
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
