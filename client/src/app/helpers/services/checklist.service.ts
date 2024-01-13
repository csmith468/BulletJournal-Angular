import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MorningChecklist } from '../models/morningChecklist';
import { NightChecklist } from '../models/nightChecklist';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  baseUrl = environment.apiUrl;

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
}
