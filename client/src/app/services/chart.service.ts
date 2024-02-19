import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FieldType } from '../components/trends/fieldType';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private addedFieldSource = new Subject<{field: FieldType, chartNumber: number}>();
  private removedFieldSource = new Subject<{field: FieldType, chartNumber: number}>();
  private resetChartSource = new Subject<{selectedFields: FieldType[], fieldType: string, aggregation: string, chartNumber: number}>();
  private chartVisibilitySource = new Subject<{isVisible: boolean, chartNumber: number}>();

  constructor() { }

  addedField$ = this.addedFieldSource.asObservable();
  removedField$ = this.removedFieldSource.asObservable();
  resetChart$ = this.resetChartSource.asObservable();
  chartVisibility$ = this.chartVisibilitySource.asObservable();

  emitAddedField(field: FieldType, chartNumber: number) {
    this.addedFieldSource.next({field, chartNumber});
  }

  emitRemovedField(field: FieldType, chartNumber: number) {
    this.removedFieldSource.next({field, chartNumber});
  }

  emitResetChart(selectedFields: FieldType[], fieldType: string, aggregation: string, chartNumber: number) {
    this.resetChartSource.next({selectedFields, fieldType, aggregation, chartNumber});
  }

  updateChartVisibility(isVisible: boolean, chartNumber: number) {
    this.chartVisibilitySource.next({isVisible, chartNumber});
  }
}
