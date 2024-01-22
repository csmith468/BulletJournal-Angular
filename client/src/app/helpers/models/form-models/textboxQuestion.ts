import { QuestionBase } from "./questionBase";

export class TextboxQuestion extends QuestionBase<string | boolean> {
    override type = 'text';
    override controlType = 'textbox';
}
