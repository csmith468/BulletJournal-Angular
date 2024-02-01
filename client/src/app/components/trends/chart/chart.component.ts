import { Component, Input, OnInit } from '@angular/core';
import { FieldType } from '../fieldType';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  @Input() data: Array<any> = [];
  @Input() fields: FieldType[] = [];
  @Input() typesInQuestionSet: string[] = [];

  selectedFields: string[] = [];
  selectedType: string = '';
  selectedRangeType: string = 'monthly';

  constructor() {
  }

  ngOnInit(): void {
    this.selectedFields = this.fields.map(field => field['field']);
  }


  onUpdateSelectedType(type: any) {
    this.selectedType = type;
  }

  onUpdateSelectedRangeType(type: any) {
    this.selectedRangeType = type;
  }

}
