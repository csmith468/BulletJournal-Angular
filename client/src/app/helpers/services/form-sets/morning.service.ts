import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../../models/data-models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { MorningChecklist } from '../../models/data-models/morningChecklist';

@Injectable({
  providedIn: 'root'
})
export class MorningService {
  baseUrl = environment.apiUrl;
  paginatedResultMorning: PaginatedResult<MorningChecklist[]> = new PaginatedResult<MorningChecklist[]>;

  constructor(private http: HttpClient) { }

  getMorningTable(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<MorningChecklist[]>(this.baseUrl + 'morning/getMyChecklists',
      {observe: 'response', params}).pipe(map(
        response => {
          if (response.body) this.paginatedResultMorning.result = response.body;
          const pagination = response.headers.get('Pagination');
          if (pagination) this.paginatedResultMorning.pagination = JSON.parse(pagination);
          return this.paginatedResultMorning;
        }
      ))
  }

  getMorningChecklistById(id: string) {
    return this.http.get<MorningChecklist>(this.baseUrl + 'morning/getMyChecklistById/' + id);
  }

  deleteMorningChecklist(id: number) {
    return this.http.delete(this.baseUrl + 'morning/delete/' + id.toString());
  }
}
