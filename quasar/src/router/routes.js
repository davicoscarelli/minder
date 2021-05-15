
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: { name: 'Home' },
        component: () => import('pages/Index.vue')
      },
      {
        path: '/my-account',
        name: 'myaccount',
        meta: { name: 'My Account' },
        component: () => import('pages/my_account_page.vue')
      },
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'auth.login',
        meta: { name: 'Login', authNotRequired: true },
        component: () => import('pages/login_page.vue')
      },
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'register',
        name: 'auth.register',
        meta: { name: 'Register', authNotRequired: true },
        component: () => import('pages/register1_page.vue')
      },
      {
        path: 'register/:id?',
        name: 'auth.register',
        meta: { name: 'Register', authNotRequired: true },
        component: () => import('pages/register2_page.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
