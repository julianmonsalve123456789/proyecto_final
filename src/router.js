import { createRouter, createWebHistory } from 'vue-router';
import InicioComponent from './components/InicioComponent.vue';
import MenuComponent from './components/MenuComponent.vue';
import PerfilComponent from './components/PerfilComponent.vue';
import LoginComponent from './components/LoginComponent.vue';

const routes = [
  {
    path: '/',
    component: InicioComponent,
  },
  {
    path: '/menu',
    component: MenuComponent,
  },
  {
    path: '/perfil',
    component: PerfilComponent,
  },
  {
    path: '/login',
    component: LoginComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
