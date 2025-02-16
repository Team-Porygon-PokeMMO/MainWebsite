import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AbilityComponent from "@/components/AbilityComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import StatusComponent from "@/components/StatusComponent.vue";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "ability",
        component: AbilityComponent,
      },
      {
        path: "about",
        component: AboutComponent,
      },
      {
        path: "status",
        component: StatusComponent,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
