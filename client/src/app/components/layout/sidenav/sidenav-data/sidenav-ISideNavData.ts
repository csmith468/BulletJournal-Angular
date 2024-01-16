export interface ISideNavData {
    routeLink: string;
    icon: string;
    label: string;
    expanded?: boolean;
    items?: ISideNavData[]
}