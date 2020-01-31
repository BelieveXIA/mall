
import Vue from 'vue';
import Router from 'vue-router';
// import Home from 'pages/home/index.vue';
// import Category from 'pages/category/index.vue';
// import Cart from 'pages/cart/index.vue';
// import Personal from 'pages/personal/index.vue';
// import Search from 'pages/search/index.vue';
// import Product from 'pages/product/index.vue';

Vue.use(Router);

const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('pages/home'),
        children: [
            {
                path: 'product/:id',
                name: 'home-product',
                component: () => import('pages/product')
            }
        ]
    },
    {
        path: '/category',
        name: 'category',
        component: () => import('pages/category')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('pages/cart')
    },
    {
        path: '/personal',
        name: 'personal',
        component: () => import('pages/personal')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('pages/search')
    },
    {
        path: '*',
        redirect: '/home'
    }
];

export default new Router({
    routes
});
