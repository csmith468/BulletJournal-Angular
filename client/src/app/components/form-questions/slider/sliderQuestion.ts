import { Question_Checklist } from "src/app/models/question-models/question_checklist";

import { QuestionFormItem } from "../../../models/question-models/questionFormItem";

export class SliderQuestion extends QuestionFormItem<any> { }

export function createSliderQuestion(q: Question_Checklist, item?: any) {
   return new SliderQuestion({
        value: (item && item[q.key]) ? item[q.key] : ((q.minValue) ? q.minValue : 0),
        key: q.key,
        label: q.label,
        questionOrder: (q.questionOrder) ? q.questionOrder : 1,
        kindBase: q.kindBase,
        kindDetail: q.kindDetail,
        minValue: q.minValue,    // will always be defined here
        maxValue: q.maxValue,    // will always be defined here
        required: false
    });
}
