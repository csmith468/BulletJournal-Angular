import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../../models/data-models/pagination';
import { Night } from '../../models/data-models/night';
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
  paginatedResultNight: PaginatedResult<Night[]> = new PaginatedResult<Night[]>;

  constructor(private http: HttpClient) { 
  }

  getNightTable(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Night[]>(this.baseUrl + 'night/getMyChecklists',
      {observe: 'response', params}).pipe(map(
        response => {
          if (response.body) this.paginatedResultNight.result = response.body;
          const pagination = response.headers.get('Pagination');
          if (pagination) this.paginatedResultNight.pagination = JSON.parse(pagination);
          return this.paginatedResultNight;
        }
      ))
  }

  deleteNightChecklist(id: number) {
    return this.http.delete(this.baseUrl + 'night/delete/' + id.toString());
  }
}
