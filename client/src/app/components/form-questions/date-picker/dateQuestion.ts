import { QuestionBase } from "../../../helpers/models/form-models/questionBase";

export class DateQuestion extends QuestionBase<any> {
    override order = 0;
    override controlType = 'text';
    override type = 'date';
}

export function createDateQuestion(key: string, label: string, required: boolean, item?: any) {
    return new DateQuestion({
        key: key,
        label: label,
        required: required,
        value: (item && item[key]) ? (item[key].includes('T') ? new Date(item[key]) : new Date(item[key] + 'T00:00:00')) : new Date
    });
}