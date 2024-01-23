import { getDate } from "ngx-bootstrap/chronos/utils/date-getters";
import { QuestionBase } from "./questionBase";

export class DateQuestion extends QuestionBase<string | boolean | Date> {
    override type = 'date';
    override controlType = 'text';
}