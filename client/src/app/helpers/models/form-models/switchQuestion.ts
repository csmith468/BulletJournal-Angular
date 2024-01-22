import { QuestionBase } from "./questionBase";

export class SwitchQuestion extends QuestionBase<boolean> {
    override type = 'switch';
    override controlType = 'checkbox';
}