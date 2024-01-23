import { QuestionBase } from "./questionBase";

export class TextboxQuestion extends QuestionBase<string | boolean | Date> {
    override type = 'text';
    override controlType = 'textbox';
}
