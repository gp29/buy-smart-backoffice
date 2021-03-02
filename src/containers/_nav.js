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
    }
]
