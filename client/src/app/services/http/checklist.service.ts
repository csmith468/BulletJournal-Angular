import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { PaginatedResult } from '../../models/data-models/pagination';
import { getDateOnly } from '../../helpers/functions/getDateOnlyFn';
import { CompletedChecklists } from '../../models/data-models/completedChecklists';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  baseUrl = environment.apiUrl + 'checklist/';

  constructor(private http: HttpClient) { }

  getChecklistById(type: string, id: string) {
    return this.http.get<any>(this.baseUrl + type + '/getMyChecklistById/' + id);
  }

  addOrUpdateEntry(type: string, model: any, id: number) {
    if (id) return this.http.put(this.baseUrl + type + '/updateById/' + id.toString(), model);
    else return this.http.post(this.baseUrl + type + '/add', model);
  }

  deleteEntry(type: string, id: string) {
    return this.http.delete(this.baseUrl + type + '/delete/' + id.toString());
  }


  getTableData(type: string, page?: number, itemsPerPage?: number, minDate?: string, maxDate?: string) {
    var paginatedResult: PaginatedResult<any[]> = new PaginatedResult<any[]>;
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (minDate && maxDate) {
      params = params.append('minDate', getDateOnly(minDate)!);
      params = params.append('maxDate', getDateOnly(maxDate)!);
    }

    return this.http.get<any[]>(this.baseUrl + type + '/getMyChecklists',
      {observe: 'response', params}).pipe(map(
        response => {
          if (response.body) paginatedResult.result = response.body;
          const pagination = response.headers.get('Pagination');
          if (pagination) paginatedResult.pagination = JSON.parse(pagination);
          return paginatedResult;
        }
    ))
  }

  // getCompletedToday() {
  //   return this.http.get<CompletedChecklists[]>(this.baseUrl + 'user/getCompletedToday');
  // }
}
