import { Question_Checklist } from "src/app/models/question-models/question_checklist";
import { QuestionFormItem } from "../../../models/question-models/questionFormItem";

export class SwitchQuestion extends QuestionFormItem<boolean> { }

export function createSwitchQuestion(q: Question_Checklist, item?: any) {
    return new SwitchQuestion({
        value: (item && item[q.key]) ? item[q.key] : false,
        key: q.key,
        label: q.label,
        questionOrder: (q.questionOrder) ? q.questionOrder : 1,
        kindBase: q.kindBase,
        kindDetail: q.kindDetail,
        required: false
    });
}
