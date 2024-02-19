import { ChecklistQuestion } from "src/app/models/question-models/checklistQuestion";
import { ChecklistFormItem } from "src/app/models/question-models/checklistFormItem";

export class TextboxQuestion extends ChecklistFormItem<any> { }

export function createTextboxQuestion(q: ChecklistQuestion, item?: any) {
    return new TextboxQuestion({
        value: (item && item[q.key]) ? item[q.key] : '',
        key: q.key,
        label: q.label,
        questionOrder: (q.questionOrder) ? q.questionOrder : 1,
        kindBase: q.kindBase,
        kindDetail: q.kindDetail,
        minValue: (q.minValue) ? q.minValue : undefined,
        maxValue: (q.maxValue) ? q.maxValue : undefined,
        required: false
    });
}
