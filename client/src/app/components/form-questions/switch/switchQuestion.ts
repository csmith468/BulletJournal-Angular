import { QuestionBase } from "../../../models/question-models/questionBase";

export class SwitchQuestion extends QuestionBase<boolean> {
    override type = 'switch';
    override controlType = 'checkbox';
}

export function createSwitchQuestion(key: string, label: string, item?: any) {
    return new SwitchQuestion({
        key: key,
        label: label,
        value: (item && item[key]) ? item[key] : false
    });
}