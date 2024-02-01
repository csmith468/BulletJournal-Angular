import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private addedFieldSource = new Subject<string>();
  private removedFieldSource = new Subject<string>();

  constructor() { }

  addedField$ = this.addedFieldSource.asObservable();
  removedField$ = this.removedFieldSource.asObservable();

  emitAddedField(field: string) {
    this.addedFieldSource.next(field);
  }

  emitRemovedField(field: string) {
    this.removedFieldSource.next(field);
  }
}
