import { Question_Checklist } from "src/app/models/question-models/question_checklist";
import { QuestionFormItem } from "src/app/models/question-models/questionFormItem";

export class TextboxQuestion extends QuestionFormItem<any> { }

export function createTextboxQuestion(q: Question_Checklist, item?: any) {
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
