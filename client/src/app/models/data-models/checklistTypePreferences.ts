export interface ChecklistTypePreferences {
    checklistTypePreferencesID: number;
    userID: number;
    key: string;
    label: string;
    isVisible?: boolean;
    isHeader: boolean;
    category: string;
}


export interface ChecklistTypePrefDto {
    checklistTypePreferencesID: number;
    isVisible: boolean;
}