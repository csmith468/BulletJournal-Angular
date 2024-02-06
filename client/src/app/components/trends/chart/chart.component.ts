import { Component, Input, OnInit } from '@angular/core';
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
  @Input() typeDetailsInQuestionSet: string[] = [];
  @Input() chartNumber: number = 0;
  @Input() selectedRangeType: string = 'Monthly';

  selectedFields: string[] = [];
  fieldOptions: string[] = [];
  selectedTypeDetail: string = '';
  maxFields: number = 6;

  selectForm: FormGroup;

  constructor(private chartService: ChartService) {
    this.selectForm = new FormGroup({
      typeDetail: new FormControl(null),
      rangeType: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.selectedTypeDetail = (this.typeDetailsInQuestionSet.length >= this.chartNumber - 1) 
      ? this.typeDetailsInQuestionSet[this.chartNumber - 1] 
      : this.typeDetailsInQuestionSet[this.typeDetailsInQuestionSet.length - 1];
    this.setValues();
    this.selectForm.controls['typeDetail'].setValue(this.selectedTypeDetail);
    this.selectForm.controls['rangeType'].setValue(this.selectedRangeType);

    console.log(this.selectedTypeDetail)
  }

  setValues() {
    this.fieldOptions = this.fields.filter(field => field.typeDetail == this.selectedTypeDetail).map(field => field.field);
    this.selectedFields = this.fieldOptions.slice(0, this.maxFields);
  }

  onUpdateFields(typeDetail: any) {
    const field = typeDetail.target.id;
    if (this.selectedFields.includes(field)) {
      this.selectedFields.splice(this.selectedFields.indexOf(field, 0), 1);
      this.chartService.emitRemovedField(field, this.chartNumber);
    }
    else {
      this.selectedFields.push(field);
      this.chartService.emitAddedField(field, this.chartNumber);
    }
  }

  onUpdateSelect(typeDetail: any) {
    if (this.selectedTypeDetail != this.selectForm.value['typeDetail']) {
      this.selectedTypeDetail = this.selectForm.value['typeDetail'];
      this.setValues();
    }

    if (this.selectedTypeDetail != this.selectForm.value['rangeType']) {
      this.selectedRangeType = this.selectForm.value['rangeType'];
    }

    this.chartService.emitResetChart(this.selectedFields, this.selectedTypeDetail, this.selectedRangeType, this.chartNumber);
  }
}
