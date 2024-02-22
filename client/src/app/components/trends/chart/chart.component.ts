import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/components/chart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Question_Chart } from 'src/app/models/question-models/question_chart';
import { QuestionKind } from 'src/app/models/question-models/questionKind';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data: Array<any> = [];
  @Input() chartQuestions: Question_Chart[] = [];
  @Input() questionKindsInSet: QuestionKind[] = [];
  @Input() chartNumber: number = 0;
  @Input() selectedRangeType: string = 'Monthly';

  selectedQuestions: Question_Chart[] = [];
  questionOptionsInKind: Question_Chart[] = [];
  selectedKindDetail: QuestionKind | undefined;
  maxQuestionsInitial: number = 6;
  isVisible: boolean = true;
  selectForm: FormGroup;

  constructor(private chartService: ChartService) {
    this.selectForm = new FormGroup({
      kindDetail: new FormControl(null),
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
    this.selectedKindDetail = (this.questionKindsInSet.length > this.chartNumber) 
      ? this.questionKindsInSet[this.chartNumber] 
      : this.questionKindsInSet[0];
    this.setValues();

    console.log(this.selectedRangeType)

    // Form for setting type of form and range 
    this.selectForm.controls['kindDetail'].setValue(this.selectedKindDetail.kindDetail);
    this.selectForm.controls['rangeType'].setValue(this.selectedRangeType);
  }

  // Get the questions within that question type and select up to the maximum number of questions initially
  setValues() {
    this.questionOptionsInKind = this.chartQuestions.filter(q => q.questionKindID == this.selectedKindDetail!.questionKindID);
    this.selectedQuestions = this.questionOptionsInKind.slice(0, this.maxQuestionsInitial);
  }

  // Send the actual chart the questions available to it (user can select/deselect questions to see in chart through checkbox panel)
  onUpdateQuestions(kindDetail: any) {
    const questionKey = kindDetail.target.id;
    var question = this.selectedQuestions.find(f => f.key === questionKey);
    if (question) {
      this.selectedQuestions.splice(this.selectedQuestions.indexOf(question, 0), 1);
      this.chartService.emitRemovedQuestion(question, this.chartNumber);
    }
    else {
      question = this.questionOptionsInKind!.find(f => f.key === questionKey);
      if (question) {
        this.selectedQuestions.push();
        this.chartService.emitAddedQuestion(question, this.chartNumber);
      }
    }
  }

  // When form updates for the range type or the question types
  onUpdateSelect() {
    // Reset available questions for that question type if applicable
    if (this.selectedKindDetail?.kindDetail != this.selectForm.value['kindDetail']) {
      this.selectedKindDetail = this.questionKindsInSet.find(k => k.kindDetail == this.selectForm.value['kindDetail']);
      this.setValues();
    }

    // Reset range type if applicable
    if (this.selectedRangeType != this.selectForm.value['rangeType']) {
      this.selectedRangeType = this.selectForm.value['rangeType'];
    }

    // Send the actual chart component the updated data
    this.chartService.emitResetChart(this.selectedQuestions, this.selectedKindDetail!, 
      this.selectedRangeType, this.chartNumber);
  }
}
