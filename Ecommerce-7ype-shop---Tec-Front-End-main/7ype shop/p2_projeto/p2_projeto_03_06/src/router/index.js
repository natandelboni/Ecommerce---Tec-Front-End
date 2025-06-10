import { createRouter, createWebHistory } from 'vue-router';
import ProductsView from '../views/ProductsView.vue';
import CategoryView from '../views/CategoryView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import CartView from '../views/CartView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/products/category/:categoryName',
    name: 'products-by-category',
    component: ProductsView,
    props: true
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryView
  },
  {
    path: '/products/:id',
    name: 'product-details',
    component: ProductDetailView,
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;