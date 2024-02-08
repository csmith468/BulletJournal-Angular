export interface UserQuestionPreferences {
    userQuestionPreferencesID: number;
    tableName: string;
    columnName: string;
    isColumnVisible: boolean;
}


export interface UserQuestionPrefDto {
    userQuestionPreferencesID: number;
    isColumnVisible: boolean;
}