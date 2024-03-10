export interface VisibleChecklistType {
    key: string;
    label: string;
    icon: string;
    category?: string;
    isHeader?: boolean;
    includeInCharts: boolean;
    canUpdateQuestions: boolean;
}