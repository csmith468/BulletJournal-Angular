import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private addedFieldSource = new Subject<{field: string, chartNumber: number}>();
  private removedFieldSource = new Subject<{field: string, chartNumber: number}>();

  constructor() { }

  addedField$ = this.addedFieldSource.asObservable();
  removedField$ = this.removedFieldSource.asObservable();

  emitAddedField(field: string, chartNumber: number) {
    this.addedFieldSource.next({field, chartNumber});
  }

  emitRemovedField(field: string, chartNumber: number) {
    this.removedFieldSource.next({field, chartNumber});
  }
}
