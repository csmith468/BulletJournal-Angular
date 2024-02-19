import { ChecklistQuestion } from "src/app/models/question-models/checklistQuestion";
import { ChecklistFormItem } from "../../../models/question-models/checklistFormItem";

export class DropdownQuestion extends ChecklistFormItem<any> { }


export function createDropdownQuestion(q: ChecklistQuestion, options: { key: string, value: string }[], item?: any) {
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