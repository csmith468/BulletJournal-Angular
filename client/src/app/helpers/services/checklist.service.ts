import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { ChecklistEntry } from '../models/data-models/checklistEntry';
import { PaginatedResult } from '../models/data-models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  baseUrl = environment.apiUrl;
  table: any[] = [];
  type: string = '';
  paginatedResult: PaginatedResult<any[]> = new PaginatedResult<any[]>;

  constructor(private http: HttpClient) { }

  addEntry(model: any, type: string) {
    return this.http.post(this.baseUrl + type + type + '/add', model);
  }

  updateEntry(model: any, id:number, type: string) {
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

  getEntryById(id: string, type: string) {
    return this.http.get<any>(this.baseUrl + type + 'g/getMyChecklistById/' + id);
  }

  deleteEntry(id: number, type: string) {
    return this.http.delete(this.baseUrl + type + '/delete/' + id.toString());
  }
}
