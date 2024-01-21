import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MorningChecklist } from '../models/morningChecklist';
import { NightChecklist } from '../models/nightChecklist';
import { map, of } from 'rxjs';
import { MorningTable } from '../models/morningTable';
import { MorningTableComponent } from 'src/app/components/data/tables/morning-table/morning-table.component';
import { PaginatedResult } from '../models/pagination';
import { NightTable } from '../models/nightTable';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  baseUrl = environment.apiUrl;
  morningTable: MorningTable[] = [];
  nightChecklists: NightChecklist[] = [];
  paginatedResultMorning: PaginatedResult<MorningTable[]> = new PaginatedResult<MorningTable[]>;
  paginatedResultNight: PaginatedResult<NightTable[]> = new PaginatedResult<NightTable[]>;

  constructor(private http: HttpClient) { 
  }

  addMorningChecklist(model: any) {
    return this.http.post<MorningChecklist>(
      this.baseUrl + 'checklist/addMorning', model);
  }

  addNightChecklist(model: any) {
    return this.http.post<NightChecklist>(
      this.baseUrl + 'checklist/addNight', model);
  }

  getMorningChecklist(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<MorningTable[]>(this.baseUrl + 'checklist/getMyMorningChecklists',
      {observe: 'response', params}).pipe(map(
        response => {
          if (response.body) this.paginatedResultMorning.result = response.body;
          const pagination = response.headers.get('Pagination');
          if (pagination) this.paginatedResultMorning.pagination = JSON.parse(pagination);
          return this.paginatedResultMorning;
        }
      ))
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
}
