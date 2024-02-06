import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldType } from '../fieldType';
import { ChartService } from 'src/app/helpers/services/chart.service';
import { FormControl, FormGroup } from '@angular/forms';

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
  @Input() selectedRangeType: string = 'monthly';

  selectedFields: string[] = [];
  fieldOptions: string[] = [];
  selectedType: string = 'switch';
  maxFields: number = 6;

  selectForm: FormGroup;

  constructor(private chartService: ChartService) {
    this.selectForm = new FormGroup({
      type: new FormControl(null),
      rangeType: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.selectedType = (this.typesInQuestionSet.length >= this.chartNumber - 1) 
      ? this.typesInQuestionSet[this.chartNumber - 1] 
      : this.typesInQuestionSet[this.typesInQuestionSet.length - 1];
    this.setValues();
    this.selectForm.controls['type'].setValue(this.selectedType);
    this.selectForm.controls['rangeType'].setValue(this.selectedRangeType);
  }

  setValues() {
    this.fieldOptions = this.fields.filter(field => field.type == this.selectedType).map(field => field.field);
    this.selectedFields = this.fieldOptions.slice(0, this.maxFields);
  }

  onUpdateFields(type: any) {
    const field = type.target.id;
    if (this.selectedFields.includes(field)) {
      this.selectedFields.splice(this.selectedFields.indexOf(field, 0), 1);
      this.chartService.emitRemovedField(field, this.chartNumber);
    }
    else {
      this.selectedFields.push(field);
      this.chartService.emitAddedField(field, this.chartNumber);
    }
  }

  onUpdateSelect(type: any) {
    if (this.selectedType != this.selectForm.value['type']) {
      this.selectedType = this.selectForm.value['type'];
      this.setValues();
    }

    if (this.selectedType != this.selectForm.value['rangeType']) {
      this.selectedRangeType = this.selectForm.value['rangeType'];
    }

    this.chartService.emitResetChart(this.selectedFields, this.selectedType, this.selectedRangeType, this.chartNumber);
  }
}
