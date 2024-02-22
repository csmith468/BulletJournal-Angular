export interface Question_Checklist {
    checklistTypeID: string;
    key: string;
    label: string;
    questionKindID: number;
    kindBase: string;
    kindDetail: string;
    questionOrder?: number;
    minValue?: number;
    maxValue?: number;
}