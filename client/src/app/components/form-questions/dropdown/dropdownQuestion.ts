import { Question_Checklist } from "src/app/models/question-models/question_checklist";
import { QuestionFormItem } from "../../../models/question-models/questionFormItem";

export class DropdownQuestion extends QuestionFormItem<any> { }


export function createDropdownQuestion(q: Question_Checklist, options: { key: string, value: string }[], item?: any) {
    if ('' in options.keys() || '' in options.values()) {
        options.unshift({key: '',  value: ''}) // move empty value first to be default option
    }

    return new DropdownQuestion({
        value: (item && item[q.key]) ? item[q.key] : '',
        key: q.key,
        label: q.label,
        questionOrder: (q.questionOrder) ? q.questionOrder : 1,
        kindBase: q.kindBase,
        kindDetail: q.kindDetail,
        required: false,
        options: options
    });
}


// createDropdownQuestion('test', 'test dropdown', true, 
// [
//       {key: 'solid',  value: 'Solid'},
//       {key: 'great',  value: 'Great'},
//       {key: 'good',   value: 'Good'},
//       {key: 'unproven', value: 'Unproven'}
// ])