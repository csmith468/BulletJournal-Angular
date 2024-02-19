import { Component, Input, OnInit } from '@angular/core';
import { FieldType } from '../fieldType';
import { ChartService } from 'src/app/services/chart.service';
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

  selectedFields: FieldType[] = [];
  fieldOptions: FieldType[] = [];
  selectedTypeDetail: string = '';
  maxFieldsInitial: number = 6;
  isVisible: boolean = true;
  selectForm: FormGroup;

  constructor(private chartService: ChartService) {
    this.selectForm = new FormGroup({
      typeDetail: new FormControl(null),
      rangeType: new FormControl(null)
    });

    // Subscribe to visibility of chart from trends component to not show chart if "minimized"
    this.chartService.chartVisibility$.subscribe(event => {
      if (event.chartNumber === this.chartNumber)
        this.isVisible = event.isVisible;
    });
  }

  ngOnInit(): void {
    // Set the type of chart to the index of the chart number so each chart shows one type initially
    this.selectedTypeDetail = (this.typeDetailsInQuestionSet.length > this.chartNumber) 
      ? this.typeDetailsInQuestionSet[this.chartNumber] 
      : this.typeDetailsInQuestionSet[0];
    this.setValues();

    // Form for setting type of form and range 
    this.selectForm.controls['typeDetail'].setValue(this.selectedTypeDetail);
    this.selectForm.controls['rangeType'].setValue(this.selectedRangeType);
  }

  // Get the fields within that field type and select up to the maximum number of fields initially
  setValues() {
    this.fieldOptions = this.fields.filter(field => field.typeDetail == this.selectedTypeDetail);
    this.selectedFields = this.fieldOptions.slice(0, this.maxFieldsInitial);
  }

  // Send the actual chart the fields available to it (user can select/deselect fields to see in chart through checkbox panel)
  onUpdateFields(typeDetail: any) {
    const fieldLabel = typeDetail.target.id;
    var field = this.selectedFields.find(f => f.label === fieldLabel);
    if (field) {
      this.selectedFields.splice(this.selectedFields.indexOf(field, 0), 1);
      this.chartService.emitRemovedField(field, this.chartNumber);
    }
    else {
      field = this.fieldOptions!.find(f => f.label === fieldLabel);
      if (field) {
        this.selectedFields.push();
        this.chartService.emitAddedField(field, this.chartNumber);
      }
    }
  }

  // When form updates for the range type or the field types
  onUpdateSelect(typeDetail: any) {
    // Reset available fields for that field type if applicable
    if (this.selectedTypeDetail != this.selectForm.value['typeDetail']) {
      this.selectedTypeDetail = this.selectForm.value['typeDetail'];
      this.setValues();
    }

    // Reset range type if applicable
    if (this.selectedTypeDetail != this.selectForm.value['rangeType']) {
      this.selectedRangeType = this.selectForm.value['rangeType'];
    }

    // Send the actual chart component the updated data
    this.chartService.emitResetChart(this.selectedFields, this.selectedTypeDetail, this.selectedRangeType, this.chartNumber);
  }
}
