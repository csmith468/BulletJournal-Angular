import { QuestionBase } from "./questionBase";

export class DropdownQuestion extends QuestionBase<string | boolean> {
    override type = 'dropdown';
    override controlType = 'dropdown';
}