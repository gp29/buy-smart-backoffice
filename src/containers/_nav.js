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
        icon: 'cil-check',
    },
]
