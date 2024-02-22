export interface QuestionPreferences {
    questionPreferencesID: number;
    checklistTypeName: string;
    key: string;
    keyNumber?: number;
    label: string;
    questionKindID: number;
    standardQuestionID: number;
    isVisible: boolean;
    questionOrder?: number;
    minValue?: number;
    maxValue?: number;
}

export interface QuestionPrefDto {
    questionPreferencesID: number;
    isVisible: boolean;
}