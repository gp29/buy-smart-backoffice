import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const addProduct = React.lazy(() => import('./views/dashboard/add'))
const banner = React.lazy(() => import('./views/banner/view'))
const offer = React.lazy(() => import('./views/offer/view'))
const feed = React.lazy(() => import('./views/feed/view'))
const ad = React.lazy(() => import('./views/ad/view'))
const defaultAd = React.lazy(() => import('./views/default-ad/view'))
const lottie = React.lazy(() => import('./views/lottie/view'))
const version = React.lazy(() => import('./views/version/view'))
const settings = React.lazy(() => import('./views/settings/view'))
const notification = React.lazy(() => import('./views/notification/view'))
const about = React.lazy(() => import('./views/about/view'))
const viewResult = React.lazy(() => import('./views/result/view'))
// User
const UserView = React.lazy(() => import('./views/admin/view'))
const UserAdd = React.lazy(() => import('./views/admin/add'))
const UserEdit = React.lazy(() => import('./views/admin/edit'))
// report
const reportView = React.lazy(() => import('./views/report/view'))
const reportAdd = React.lazy(() => import('./views/report/add'))
const reportEdit = React.lazy(() => import('./views/report/edit'))
const reportUserReported = React.lazy(() => import('./views/report/reported'))

const routes = [
  	{ path: '/', exact: true, name: 'Home', },
  	{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/product/add', name: 'Add Product', component: addProduct },
    { path: '/result', name: 'Results', component: viewResult },
    { path: '/user/view', name: 'View User', component: UserView },
    { path: '/user/add', name: 'Add User', component: UserAdd },
    { path: '/user/edit/:id', name: 'Edit User', component: UserEdit },

    { path: '/report/view', name: 'View Report', component: reportView },
    { path: '/report/add', name: 'Add Report', component: reportAdd },
    { path: '/report/edit/:id', name: 'Edit Report', component: reportEdit },
    { path: '/reported', name: 'User Reported', component: reportUserReported },

    { path: '/banner', name: 'Banner', component: banner },
    { path: '/offer', name: 'Offer', component: offer },
    { path: '/about', name: 'About', component: about },
    { path: '/feed', name: 'Feed', component: feed },
    { path: '/ad', name: 'Ad', component: ad },
    { path: '/default-ad', name: 'Default Ad', component: defaultAd },
    { path: '/lottie', name: 'Lottie', component: lottie },
    { path: '/version', name: 'Version', component: version },
    { path: '/settings', name: 'Settings', component: settings },
    { path: '/notification', name: 'Notification', component: notification },
]

export default routes
