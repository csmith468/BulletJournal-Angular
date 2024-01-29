import { ISideNavData } from "./sidenav-ISideNavData";

export const sidenav_links_loggedIn: ISideNavData[] = [
    {
        routeLink: 'checklists',
        icon: 'fa fa-check-square-o',
        label: 'Checklists',
        items: [
            {
                routeLink: 'checklists/morning/add',
                icon: 'fa fa-coffee',
                label: 'Add Morning',
            },
            {
                routeLink: 'checklists/night/add',
                icon: 'fa fa-moon-o',
                label: 'Add Night',
            },
            {
                routeLink: 'checklists/daily/add',
                icon: 'fa fa-sun-o',
                label: 'Add Daily',
            },
            {
                routeLink: 'checklists/wellbeing/add',
                icon: 'fa fa-smile-o',
                label: 'Add Wellbeing',
            },
            {
                routeLink: 'checklists/physicalSymptoms/add',
                icon: 'fa fa-heartbeat',
                label: 'Add Physical Symptoms',
            },
            {
                routeLink: 'checklists/sleep',
                icon: 'fa fa-bed',
                label: 'Add Sleep',
                items: [
                    {
                        routeLink: 'checklists/sleep/test',
                        icon: 'fa fa-moon-o',
                        label: 'Level1',
                        items: [
                            {
                                routeLink: 'checklists/sleep/test/test2',
                                icon: 'fa fa-moon-o',
                                label: 'Level2'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        routeLink: 'tables',
        icon: 'fa fa-table',
        label: 'Tables',
        items: [
            {
                routeLink: 'tables/morning',
                icon: 'fa fa-coffee',
                label: 'View Morning Entries',
            },
            {
                routeLink: 'tables/night',
                icon: 'fa fa-moon-o',
                label: 'View Night Entries',
            },
            {
                routeLink: 'tables/daily',
                icon: 'fa fa-sun-o',
                label: 'View Daily Entries',
            },
            {
                routeLink: 'tables/wellbeing',
                icon: 'fa fa-smile-o',
                label: 'View Wellbeing Tracker',
            },
            {
                routeLink: 'tables/physicalSymptoms',
                icon: 'fa fa-heartbeat',
                label: 'View Physical Symptoms',
            },
            {
                routeLink: 'tables/sleep',
                icon: 'fa fa-bed',
                label: 'View Sleep Data',
            }
        ]
    },
    {
        routeLink: 'trends',
        icon: 'fa fa-line-chart',
        label: 'Trends',
        items: [
            {
                routeLink: 'trends/morning',
                icon: 'fa fa-sun-o',
                label: 'View Morning Trends',
            },
            {
                routeLink: 'trends/night',
                icon: 'fa fa-moon-o',
                label: 'View Night Trends',
            },
            {
                routeLink: 'trends/sleep',
                icon: 'fa fa-bed',
                label: 'View Sleep Trends',
            }
        ]
    },
    {
        routeLink: 'about',
        icon: 'fa fa-info-circle',
        label: 'About'
    },
    // {
    //     routeLink: 'settings',
    //     icon: 'fa fa-cog',
    //     label: 'Settings',
    //     items: [
    //         {
    //             routeLink: 'profile',
    //             icon: 'fa fa-user',
    //             label: 'Profile'
    //         },
    //         {
    //             routeLink: 'logout',
    //             icon: 'fa fa-sign-out',
    //             label: 'Logout'
    //         }
    //     ]
    // }
];

