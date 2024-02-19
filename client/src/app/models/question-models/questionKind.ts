export interface QuestionKind {
    questionKindID: number;
    kindBase: string;
    kindDetail: string;
    includeInCharts: boolean;
    isPercentage?: boolean;
    isCurrency?: boolean;
    minValue?: number;
    maxValue?: number;
    minDecimalPlacesYAxis?: number;
    maxDecimalPlacesYAxis?: number;
    minDecimalPlacesYLabel?: number;
    maxDecimalPlacesYLabel?: number;
}