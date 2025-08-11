import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/explore',
          name: 'explore',
          component: () => import('@/views/ExploreView.vue'),
        },
        {
          path: '/marketplace',
          name: 'marketplace',
          component: () => import('@/views/Marketplace.vue'),
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('@/views/Cart.vue'),
        },
        {
          path: '/account',
          name: 'account',
          component: () => import('@/views/Account.vue'),
        },

        {
          path: '/favourites',
          name: 'favourite',
          component: () => import('@/views/Wishlist.vue'),
        },
        {
          path: '/notifications',
          name: 'notification',
          component: () => import('@/views/Notification.vue'),
        },

        //Store Pages
        {
          path: '/store/:slug',
          name: 'store',
          component: () => import('@/views/store/Home.vue'),
        },
        {
          path: '/store/:storeslug/products/:id',
          name: 'product-detail',
          component: () => import('../views/store/ProductDetail.vue'),
        },

        //Marketplace
        {
          path: '/marketplace/item/:id',
          name: 'item-detail',
          component: () => import('@/views/marketplace/ItemDetail.vue'),
        },

        //Account
        {
          path: '/account/orders',
          name: 'orders',
          component: () => import('@/views/account/Orders.vue'),
        },
        {
          path: '/account/following',
          name: 'followings',
          component: () => import('@/views/account/Following.vue'),
        },
        {
          path: '/account/profile',
          name: 'profile',
          component: () => import('@/views/account/Profile.vue'),
        },
        {
          path: '/account/addresses',
          name: 'addresses',
          component: () => import('@/views/account/Address.vue'),
        },
        {
          path: '/account/my-stores',
          name: 'my-stores',
          component: () => import('@/views/account/MyStores.vue'),
        },
        {
          path: '/account/marketplace',
          name: 'my-marketplace',
          component: () => import('@/views/account/MyMarketplace.vue'),
        },
      ]
    },
    {
      path: '/admin/:storeslug',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/admin/Dashboard.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/admin/Products.vue'),
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('@/views/admin/Category.vue'),
        },
        {
          path: 'tag',
          name: 'tag',
          component: () => import('@/views/admin/Tag.vue'),
        },
        {
          path: 'orders',
          name: 'orders-list',
          component: () => import('@/views/admin/Order.vue'),
        },
        {
          path: 'customer',
          name: 'customer',
          component: () => import('@/views/admin/Customer.vue'),
        },
        {
          path: 'payment',
          name: 'payment',
          component: () => import('@/views/admin/Payment.vue'),
        },
        {
          path: 'reports',
          name: 'reports',
          component: () => import('@/views/admin/Report.vue'),
        },
        {
          path: 'setting',
          name: 'setting',
          component: () => import('@/views/admin/Setting.vue'),
        },
        {
          path: 'sales',
          name: 'sales',
          component: () => import('@/views/admin/Sale.vue'),
        },
        {
          path: 'coupons',
          name: 'coupons',
          component: () => import('@/views/admin/Coupon.vue'),
        },
      ]
    },
  ],
    scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 }
  }
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     if (!user) {
//       return next({ name: 'login' })
//     }

//     if (to.meta.role && user.role !== to.meta.role) {
//       return next({ name: 'unauthorized' }) // or home page
//     }
//   }

//   next()
// })


export default router
