import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Search from "../views/Search.vue";
import Tracks from "../components/Tracks.vue";
import Artists from "../components/Artists.vue";
import Albums from "../components/Albums.vue";
import Favourite from "../views/Favourite.vue";
import FavouriteTracks from "../components/FavouriteTracks.vue";
import FavouriteArtists from "../components/FavouriteArtists.vue";
import FavouriteAlbums from "../components/FavouriteAlbums.vue";
//import { auth } from "../firebase";
//import store from "../store";

import { useStoreUser } from "../stores/storeUser";

const routes = [,
  {
    path: "/",
    name: "Search",
    component: Search,
    redirect: '/tracks',
    meta: {
      requiresAuth: true,
    },
    children: [{
      path: 'tracks',
      name: 'Tracks',
      component: Tracks,
    },
    {
      path: 'artists',
      name: 'Artists',
      component: Artists,
    },
    {
      path: 'albums',
      name: 'Albums',
      component: Albums,
    }]
  },

  {
    path: "/favourite",
    name: "Favourite",
    component: Favourite,
    redirect: '/favourite/tracks',
    meta: {
      requiresAuth: true,
    },
    children: [{
      path: 'tracks',
      name: 'FavouriteTracks',
      component: FavouriteTracks,
    },
    {
      path: 'artists',
      name: 'FavouriteArtists',
      component: FavouriteArtists,
    },
    {
      path: 'albums',
      name: 'FavouriteAlbums',
      component: FavouriteAlbums,
    }]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.path === "/login" && auth.currentUser) {
//     next("/");
//     return;
//   }

//   if (
//     to.matched.some((record) => record.meta.requiresAuth) &&
//     !auth.currentUser
//   ) {
//     next("/login");
//     return;
//   }

//   next();
// });

router.beforeEach((to, from, next) => {
  const store = useStoreUser();
  //const auth = store.getters.auth;
  const auth = store.$state.accessToken;
  if (to.path === "/login"  && auth) {
    next("/");
    return;
  }

  if (to.path === "/register"  && auth) {
    next("/");
    return;
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !auth) {
    next("/login");
    return;
  }

  next();
});

export default router;
