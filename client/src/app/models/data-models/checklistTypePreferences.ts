export interface ChecklistTypePreferences {
    checklistTypePreferencesID: number;
    userID: number;
    key: string;
    label: string;
    isVisible?: boolean;
}


export interface ChecklistTypePrefDto {
    checklistTypePreferencesID: number;
    isVisible: boolean;
}