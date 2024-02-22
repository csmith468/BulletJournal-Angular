import { GetDateType } from "src/app/helpers/functions/getDateTypeFn";
import { QuestionFormItem } from "../../../models/question-models/questionFormItem";
import { Question_Checklist } from "src/app/models/question-models/question_checklist";

export class DateQuestion extends QuestionFormItem<any> { }


export function createDateQuestion(q: Question_Checklist, item?: any) {
    return new DateQuestion({
        value: (item && item[q.key]) ? GetDateType(item[q.key]) : new Date,
        key: q.key,
        label: q.label,
        questionOrder: (q.key == 'date') ? 0 : ((q.questionOrder) ? q.questionOrder : 1), // actual 'date' question always first
        kindBase: q.kindBase,
        kindDetail: q.kindDetail,
        required: (q.key == 'date') // only required if it is the actual 'date' question
    });
}


export function createDateQuestionParams(
    key: string, label: string, required: boolean, questionOrder?: number, value?: Date) 
{
    return new DateQuestion({
        value: (value) ? value : new Date,
        key: key,
        label: label,
        questionOrder: (questionOrder) ? questionOrder : 1, 
        kindBase: 'date',
        kindDetail: 'Date',
        required: required
    });
}
