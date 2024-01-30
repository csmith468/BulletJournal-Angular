export interface QuestionSet {
    questionId: number;
    source: string;
    key: string;
    type: string;
    question: string;
    options: [];
    minValue: number;
    maxValue: number;
}