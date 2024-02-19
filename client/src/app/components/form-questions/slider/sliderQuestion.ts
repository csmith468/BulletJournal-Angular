import { QuestionBase } from "../../../models/question-models/questionBase";

export class SliderQuestion extends QuestionBase<any> {
    override controlType = 'slider';
    override type = 'slider';
}

export function createSliderQuestion(key: string, label: string, minValue: number, maxValue: number, item?: any) {
   return new SliderQuestion({
        key: key,
        label: label,
        value: (item && item[key]) ? item[key] : 0,
        minValue: minValue,
        maxValue: maxValue
    });
}
