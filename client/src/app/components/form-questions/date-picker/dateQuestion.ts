import { GetDateType } from "src/app/helpers/functions/getDateTypeFn";
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
        value: (item && item[key]) ? GetDateType(item[key]) : new Date
    });
}