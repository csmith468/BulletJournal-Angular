import { ChecklistQuestion } from "src/app/models/question-models/checklistQuestion";
import { ChecklistFormItem } from "../../../models/question-models/checklistFormItem";

export class SwitchQuestion extends ChecklistFormItem<boolean> { }

export function createSwitchQuestion(q: ChecklistQuestion, item?: any) {
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
