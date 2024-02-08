export interface QuestionPreferences {
    questionPreferencesID: number;
    tableName: string;
    columnName: string;
    isColumnVisible: boolean;
}


export interface QuestionPrefDto {
    questionPreferencesID: number;
    isColumnVisible: boolean;
}