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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
  ],
    scrollBehavior(to, from, savedPosition) {
    // Always scroll to top
    return { left: 0, top: 0 }
  }
})

export default router
