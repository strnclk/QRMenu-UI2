import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [{ path: '', component: () => import('pages/Menu.vue') }],
  },
  {
    path: '/menu',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [{ path: '/menu', component: () => import('pages/Menu.vue') }],
  },
  {
    path: '/firma',
    component: () => import('pages/admin/Firma.vue'),
    children: [{ path: '/firma', component: () => import('pages/admin/Firma.vue') }],
  },
  {
    path: '/index',
    component: () => import('pages/admin/Index.vue'),
    children: [{ path: '/firma', component: () => import('pages/admin/Index.vue') }],
  },
  {
    path: '/login',
    component: () => import('pages/admin/Login.vue'),
    children: [{ path: '/firma', component: () => import('pages/admin/Login.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
