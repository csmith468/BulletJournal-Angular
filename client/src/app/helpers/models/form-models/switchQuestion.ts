import { QuestionBase } from "./questionBase";

export class SwitchQuestion extends QuestionBase<boolean> {
    override controlType = 'checkbox';
    override value = false;
}