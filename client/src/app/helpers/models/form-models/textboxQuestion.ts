import { QuestionBase } from "./questionBase";

export class TextboxQuestion extends QuestionBase<any> {
    override type = 'text';
    override controlType = 'textbox';
}

export function createTextboxQuestion(key: string, label: string, required: boolean, value?: boolean) {
    return new TextboxQuestion({
        key: key,
        label: label,
        required: required,
        value: (value) ? value : ''
    });
}

