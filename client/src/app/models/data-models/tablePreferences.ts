export interface TablePreferences {
    tablePreferencesID: number;
    userID: number;
    key: string;
    label: string;
    isVisible?: boolean;
}


export interface TablePrefDto {
    tablePreferencesID: number;
    isVisible: boolean;
}