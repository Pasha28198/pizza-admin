import {
    Home,
    Lock,
    LogOut,
    Percent
} from 'react-feather';

export const MENUITEMS = [
    // {
    //     title: 'Dashboard', icon: Home, type: 'sub', badgeType: 'primary', active: false, children: [
    //         { path: '/dashboard/default', title: 'Default', type: 'link' },
    //         { path: '/dashboard/ecommerce', title: 'E-Commerce', type: 'link' },
    //         { path: '/dashboard/university', title: 'University', type: 'link' },
    //         { path: '/dashboard/crypto', title: 'Crypto', type: 'link' },
    //         { path: '/dashboard/project', title: 'Project', type: 'link' }
    //     ]
    // },
    {
        title: 'Dashboard', icon: Home, type: 'link', path: '/', active: true
    },
    {
        title: 'Category', icon: Percent, type: 'link', path: '/categories', active: true
    },
    {
        title: 'Products', icon: Percent, type: 'link', path: '/products', active: true
    },
    {
        title: 'Ingredients', icon: Percent, type: 'link', path: '/ingredients', active: true
    },
    // {
    //     title: 'Change Password', icon: Lock, type: 'link', path: '/change-password', active: true
    // },
    {
        title: 'Logout', icon: LogOut, type: 'link', path: '/logout', active: false
    }
]

