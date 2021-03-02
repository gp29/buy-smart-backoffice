import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// User
const UserView = React.lazy(() => import('./views/admin/view'))
const UserAdd = React.lazy(() => import('./views/admin/add'))
const UserEdit = React.lazy(() => import('./views/admin/edit'))

const routes = [
  	{ path: '/', exact: true, name: 'Home', },
  	{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/user/view', name: 'View User', component: UserView },
    { path: '/user/add', name: 'Add User', component: UserAdd },
    { path: '/user/edit/:id', name: 'Edit User', component: UserEdit },
]

export default routes
