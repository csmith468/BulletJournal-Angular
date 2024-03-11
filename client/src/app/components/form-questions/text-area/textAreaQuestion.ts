import { Question_Checklist } from "src/app/models/question-models/question_checklist";
import { QuestionFormItem } from "src/app/models/question-models/questionFormItem";

export class TextAreaQuestion extends QuestionFormItem<any> { }

export function createTextAreaQuestion(q: Question_Checklist, item?: any) {
    return new TextAreaQuestion({
        value: (item && item[q.key]) ? item[q.key] : '',
        key: q.key,
        label: q.label,
        questionOrder: (q.questionOrder) ? q.questionOrder : 1,
        kindBase: q.kindBase,
        kindDetail: q.kindDetail,
        required: false
    });
}
