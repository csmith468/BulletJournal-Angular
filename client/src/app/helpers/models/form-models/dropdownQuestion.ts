import { QuestionBase } from "./questionBase";

export class DropdownQuestion extends QuestionBase<string> {
    override controlType = 'dropdown';
}