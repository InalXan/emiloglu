import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: '/sponsors',
      name: 'sponsors',
      component: () => import('../views/SponsorsView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductView.vue'),
    },
    //admin panel
    {
      path: '/admin/sponsors/one',
      name: 'adminsponsorone',
      component: () => import('../views/admin/AddSponsorOneView.vue'),
    },
    {
      path: '/admin/sponsors/two',
      name: 'adminsponsortwo',
      component: () => import('../views/admin/AddSponsorTwoView.vue'),
    },
    {
      path: '/admin/profile',
      name: 'adminprofile',
      component: () => import('../views/admin/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/login',
      name: 'adminlogin',
      component: () => import('../views/admin/LoginView.vue'),
    },
    {
      path: '/admin/category',
      name: 'admincategory',
      component: () => import('../views/admin/AddcategoryView.vue'),
    },

    {
      path: '/admin/subcategory',
      name: 'adminsubcategory',
      component: () => import('../views/admin/AddSubcategoryView.vue'),
    },
    {
      path: '/admin/products',
      name: 'adminproducts',
      component: () => import('../views/admin/AddProductView.vue'),
    },

    {
      path: '/admin/inbox',
      name: 'inbox',
      component: () => import('../views/admin/InboxView.vue'),
    },
  ],
})
// Authentication Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
