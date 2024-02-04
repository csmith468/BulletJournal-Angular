import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldType } from '../fieldType';
import { ChartService } from 'src/app/helpers/services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  @Input() data: Array<any> = [];
  @Input() fields: FieldType[] = [];
  @Input() typesInQuestionSet: string[] = [];
  @Input() chartNumber: number = 0;

  selectedFields: string[] = [];
  fieldOptions: string[] = [];
  selectedType: string = 'switch';
  selectedRangeType: string = 'monthly';


  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.selectedType = (this.typesInQuestionSet.length >= this.chartNumber - 1) 
      ? this.typesInQuestionSet[this.chartNumber - 1] 
      : this.typesInQuestionSet[this.typesInQuestionSet.length - 1];
    this.selectedFields = this.fields.map(field => field['field']).slice(0, 5);
    this.fieldOptions = this.fields.filter(field => field.type == this.selectedType).map(field => field.field);
  }

  onUpdateFields(type: any) {
    const field = type.target.id;
    if (this.selectedFields.includes(field)) {
      this.selectedFields.splice(this.selectedFields.indexOf(field, 0), 1);
      this.chartService.emitRemovedField(field);
    }
    else {
      this.selectedFields.push(field);
      this.chartService.emitAddedField(field);
    }
    // this.selectedFields.push(field);
  }


  onUpdateSelectedType(type: any) {
    this.selectedType = type;
  }

  onUpdateSelectedRangeType(type: any) {
    this.selectedRangeType = type;
  }

}
