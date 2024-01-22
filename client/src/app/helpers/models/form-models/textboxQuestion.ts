import { QuestionBase } from "./questionBase";

export class TextboxQuestion extends QuestionBase<string> {
    override controlType = 'textbox';
}
