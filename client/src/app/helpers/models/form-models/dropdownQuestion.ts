import { QuestionBase } from "./questionBase";

export class DropdownQuestion extends QuestionBase<string | boolean | Date> {
    override type = 'dropdown';
    override controlType = 'dropdown';
}