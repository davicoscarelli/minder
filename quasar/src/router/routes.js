
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
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'auth.login',
        meta: { name: 'Login', authNotRequired: true },
        component: () => import('pages/login_page.vue')
      },
      {
        path: 'register',
        name: 'auth.register',
        meta: { name: 'Register', authNotRequired: true },
        component: () => import('pages/register_page.vue')
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
