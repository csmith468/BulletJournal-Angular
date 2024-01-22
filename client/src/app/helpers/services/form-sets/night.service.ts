import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NightChecklist } from '../../models/nightChecklist';
import { PaginatedResult } from '../../models/pagination';
import { NightTable } from '../../models/nightTable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

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
    return this.http.post<NightChecklist>(
      this.baseUrl + 'checklist/addNight', model);
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