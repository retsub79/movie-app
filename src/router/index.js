import { createRouter, createWebHistory } from "vue-router";
import MovieList from "@/views/MovieList.vue";
import MovieLayout from "@/views/movie/Layout.vue";
import MovieDetails from "@/views/movie/Details.vue";
import MovieRegister from "@/views/movue/Register.vue";
import MovieEdit from "@/views/movie/Edit.vue";
import About from "@/views/About.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";

const routes = [
  {
    path: "/",
    name: "MovieList",
    component: MovieList,
    props: route => ({ page: parseInt(route.query.page)  || 1 })
  },
  {
    path: "/movies/:id",
    name: "MovieLayout",
    props: true,
    component: MovieLayout,
    children: [
      {
        path: "",
        name: "MovieDetails",
        component: MovieDetails,
      },
      {
        path: "register",
        name: "MovieRegister",
        component: MovieRegister,
      },
      {
        path: "edit",
        name: "MovieEdit",
        component: MovieEdit,
      },
    ]
  },
  {
    path: '/movie/:afterEvent(.*)',
    redirect: to => {
      return { path: '/movies/' + to.params.afterEvent }
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
