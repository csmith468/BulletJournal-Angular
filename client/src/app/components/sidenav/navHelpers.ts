export const navbarData = [
    {
        routeLink: 'checklists/morning',
        icon: 'fa fa-check-square-o',
        label: 'Checklists'
    },
    {
        routeLink: 'tables/morning',
        icon: 'fa fa-table',
        label: 'Tables'
    },
    {
        routeLink: 'trends',
        icon: 'fa fa-line-chart',
        label: 'Trends'
    },
    {
        routeLink: 'about',
        icon: 'fa fa-info-circle',
        label: 'About'
    }
];

export interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}