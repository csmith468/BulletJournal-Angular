export interface QuestionType {
    typeDetail: string;
    type: string;
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