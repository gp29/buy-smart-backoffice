import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const banner = React.lazy(() => import('./views/banner/view'))
const feed = React.lazy(() => import('./views/feed/view'))
const lottie = React.lazy(() => import('./views/lottie/view'))
const version = React.lazy(() => import('./views/version/view'))
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
    { path: '/banner', name: 'Banner', component: banner },
    { path: '/feed', name: 'Feed', component: feed },
    { path: '/lottie', name: 'Lottie', component: lottie },
    { path: '/version', name: 'Version', component: version },
]

export default routes
