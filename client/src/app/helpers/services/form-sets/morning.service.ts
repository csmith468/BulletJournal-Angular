import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MorningEntry } from '../../models/data-models/morningEntry';
import { PaginatedResult } from '../../models/data-models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MorningChecklist } from '../../models/data-models/morningChecklist';
import { BehaviorSubject, map, of } from 'rxjs';
import { QuestionBase } from '../../models/form-models/questionBase';
import { SwitchQuestion, createSwitchQuestion } from '../../models/form-models/switchQuestion';
import { TextboxQuestion } from '../../models/form-models/textboxQuestion';
import { DropdownQuestion, createDropdownQuestion } from '../../models/form-models/dropdownQuestion';
import { DateQuestion, createDateQuestion } from '../../models/form-models/dateQuestion';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { NightChecklist } from '../../models/data-models/nightChecklist';

@Injectable({
  providedIn: 'root'
})
export class MorningService {
  baseUrl = environment.apiUrl;
  morningTable: MorningEntry[] = [];
  paginatedResultMorning: PaginatedResult<MorningEntry[]> = new PaginatedResult<MorningEntry[]>;
  // currentMorningEntry: MorningEntry | undefined;
  private currentMorningEntry = new BehaviorSubject<MorningEntry | null>(null);
  currentMorningEntry$ = this.currentMorningEntry.asObservable();

  constructor(private http: HttpClient) { }

  addMorningChecklist(model: any) {
    return this.http.post(this.baseUrl + 'checklist/addMorning', model);
  }

  getMorningTable(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<MorningEntry[]>(this.baseUrl + 'checklist/getMyMorningChecklists',
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
    return this.http.get<MorningEntry>(this.baseUrl + 'checklist/getMyMorningChecklistById/' + id);
  }

  setMorningEntry(morningEntry?: MorningEntry) {
    this.currentMorningEntry.next((morningEntry) ? morningEntry : null);
  }

  getQuestions(morning?: MorningEntry) {
    const questions: QuestionBase<any>[] = [
      createDateQuestion('date', 'Date', true, this.currentMorningEntry),
      createSwitchQuestion('glassOfWater', 'Did you have a glass of water?', this.currentMorningEntry),
      createSwitchQuestion('meds', 'Did you take your meds?', this.currentMorningEntry),
      createSwitchQuestion('vitamins', 'Did you take your vitamins?', this.currentMorningEntry),
      createSwitchQuestion('breakfast', 'Did you eat breakfast?', this.currentMorningEntry)
    ];

    return of(questions); // .sort((a, b) => a.order - b.order));
  }
}
