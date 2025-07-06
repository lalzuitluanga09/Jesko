import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExploreView from '@/views/ExploreView.vue'
import Marketplace from '@/views/Marketplace.vue'
import Cart from '@/views/Cart.vue'
import Account from '@/views/Account.vue'
import Home from '@/views/store/Home.vue'
import ProductDetail from '../views/store/ProductDetail.vue'
import ItemDetail from '@/views/marketplace/ItemDetail.vue'
import Orders from '@/views/account/Orders.vue'
import Profile from '@/views/account/Profile.vue'
import Address from '@/views/account/Address.vue'
import Following from '@/views/account/Following.vue'
import Favourite from '@/views/Favourite.vue'
import Notification from '@/views/Notification.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Products from '@/views/admin/Products.vue'
import Category from '@/views/admin/Category.vue'
import Tag from '@/views/admin/Tag.vue'
import Order from '@/views/admin/Order.vue'
import Customer from '@/views/admin/Customer.vue'
import Payment from '@/views/admin/Payment.vue'
import Report from '@/views/admin/Report.vue'
import Setting from '@/views/admin/Setting.vue'
import Sale from '@/views/admin/Sale.vue'
import Coupon from '@/views/admin/Coupon.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/explore',
          name: 'explore',
          component: ExploreView,
        },
        {
          path: '/marketplace',
          name: 'marketplace',
          component: Marketplace,
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart,
        },
        {
          path: '/account',
          name: 'account',
          component: Account,
        },

        {
          path: '/favourites',
          name: 'favourite',
          component: Favourite,
        },
        {
          path: '/notifications',
          name: 'notification',
          component: Notification,
        },

        //Store Pages
        {
          path: '/store/:slug',
          name: 'store',
          component: () => Home,
        },
        {
          path: '/store/:storeslug/products/:id',
          name: 'product-detail',
          component: ProductDetail,
        },

        //Marketplace
        {
          path: '/marketplace/item/:id',
          name: 'item-detail',
          component: ItemDetail,
        },

        //Account
        {
          path: '/account/orders',
          name: 'orders',
          component: Orders,
        },
        {
          path: '/account/following',
          name: 'followings',
          component: Following,
        },
        {
          path: '/account/profile',
          name: 'profile',
          component: Profile,
        },
        {
          path: '/account/addresses',
          name: 'addresses',
          component: Address,
        },

      ]
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'products',
          name: 'products',
          component: Products,
        },
        {
          path: 'category',
          name: 'category',
          component: Category,
        },
        {
          path: 'tag',
          name: 'tag',
          component: Tag,
        },
        {
          path: 'orders',
          name: 'orders-list',
          component: Order,
        },
        {
          path: 'customer',
          name: 'customer',
          component: Customer,
        },
        {
          path: 'payment',
          name: 'payment',
          component: Payment,
        },
        {
          path: 'reports',
          name: 'reports',
          component: Report,
        },
        {
          path: 'setting',
          name: 'setting',
          component: Setting,
        },
        {
          path: 'sales',
          name: 'sales',
          component: Sale,
        },
        {
          path: 'coupons',
          name: 'coupons',
          component: Coupon,
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
