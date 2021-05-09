export default [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Administrator',
        to: '/template',
        icon: 'cil-user',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Users',
                to: '/user/view',
            }
        ]   
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Banner',
        to: '/banner',
        icon: 'cil-comment-square',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Feed',
        to: '/feed',
        icon: 'cil-check',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Lottie',
        to: '/lottie',
        icon: 'cil-circle',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Version Selector',
        to: '/version',
        icon: 'cil-basket',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Report Category',
        to: '/report/view',
        icon: 'cib-flickr',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'User Reported',
        to: '/reported',
        icon: 'cib-tumblr',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Ad',
        to: '/ad',
        icon: 'cil-puzzle',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'About us',
        to: '/about',
        icon: 'cil-puzzle',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Settings',
        to: '/settings',
        icon: 'cil-settings',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Send Notification',
        to: '/notification',
        icon: 'cil-bell',
    },
]
