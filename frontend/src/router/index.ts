import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExploreView from '@/views/ExploreView.vue'
import Marketplace from '@/views/Marketplace.vue'
import Cart from '@/views/Cart.vue'
import Account from '@/views/Account.vue'
import Home from '@/views/store/Home.vue'
import ProductDetail from '../views/store/ProductDetail.vue'
import ItemDetail from '@/views/marketplace/ItemDetail.vue'

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
  ],
})

export default router
