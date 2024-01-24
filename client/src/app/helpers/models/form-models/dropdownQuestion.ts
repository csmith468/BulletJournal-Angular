import { QuestionBase } from "./questionBase";

export class DropdownQuestion extends QuestionBase<any> {
    override type = 'dropdown';
    override controlType = 'dropdown';
}


export function createDropdownQuestion(key: string, label: string, required: boolean, options: { key: string, value: string }[], value?: string) {
    if (!('' in options.keys())) {
        options.unshift({key: '',  value: ''})
    }


    return new DropdownQuestion({
        key: key,
        label: label,
        required: required,
        options: options,
        value: (value) ? value : ''
    });
}


// createDropdownQuestion('test', 'test dropdown', true, 
// [
//       {key: 'solid',  value: 'Solid'},
//       {key: 'great',  value: 'Great'},
//       {key: 'good',   value: 'Good'},
//       {key: 'unproven', value: 'Unproven'}
// ])