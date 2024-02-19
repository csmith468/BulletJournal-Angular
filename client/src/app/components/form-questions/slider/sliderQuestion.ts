import { ChecklistQuestion } from "src/app/models/question-models/checklistQuestion";
import { ChecklistFormItem } from "../../../models/question-models/checklistFormItem";

export class SliderQuestion extends ChecklistFormItem<any> { }

export function createSliderQuestion(q: ChecklistQuestion, item?: any) {
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
