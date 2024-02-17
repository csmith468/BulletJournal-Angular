// export interface QuestionSet {
//     questionId: number;
//     source: string;
//     key: string;
//     type: string;
//     typeDetail: string;
//     question: string;
//     options: [];
//     minValue: number;
//     maxValue: number;
// }

export interface QuestionSet {
    tableName: string;
    key: string;
    label: string;
    questionOrder: number;
    type: string;
    typeDetail: string;
    minValue: number;
    maxValue: number;
}