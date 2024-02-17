import { QuestionBase } from "../../../models/form-models/questionBase";

export class TextboxQuestion extends QuestionBase<any> {
    override controlType = 'textbox';
}

export function createTextboxQuestion(key: string, label: string, type: string, minValue: number, 
        maxValue: number, item?: any) {
   return new TextboxQuestion({
        key: key,
        label: label,
        type: type,
        value: (item && item[key] != null) ? item[key] : '',
        inputType: type,
        minValue: minValue,
        maxValue: maxValue
    });
}
