export interface ChecklistQuestion {
    tableName: string;
    key: string;
    label: string;
    questionKindID: number;
    kindBase: string;
    kindDetail: string;
    questionOrder?: number;
    minValue?: number;
    maxValue?: number;
}