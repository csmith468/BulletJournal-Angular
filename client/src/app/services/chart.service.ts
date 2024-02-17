import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private addedFieldSource = new Subject<{field: string, chartNumber: number}>();
  private removedFieldSource = new Subject<{field: string, chartNumber: number}>();
  private resetChartSource = new Subject<{selectedFields: string[], fieldType: string, aggregation: string, chartNumber: number}>();
  private chartVisibilitySource = new Subject<{isVisible: boolean, chartNumber: number}>();

  constructor() { }

  addedField$ = this.addedFieldSource.asObservable();
  removedField$ = this.removedFieldSource.asObservable();
  resetChart$ = this.resetChartSource.asObservable();
  chartVisibility$ = this.chartVisibilitySource.asObservable();

  emitAddedField(field: string, chartNumber: number) {
    this.addedFieldSource.next({field, chartNumber});
  }

  emitRemovedField(field: string, chartNumber: number) {
    this.removedFieldSource.next({field, chartNumber});
  }

  emitResetChart(selectedFields: string[], fieldType: string, aggregation: string, chartNumber: number) {
    this.resetChartSource.next({selectedFields, fieldType, aggregation, chartNumber});
  }

  updateChartVisibility(isVisible: boolean, chartNumber: number) {
    this.chartVisibilitySource.next({isVisible, chartNumber});
  }
}
