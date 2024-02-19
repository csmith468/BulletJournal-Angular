export interface ChartQuestion {
    tableName: string;
    key: string;
    label: string;
    questionKindID: number;
    kindBase: string;
    kindDetail: string;
    questionOrder?: number;
}