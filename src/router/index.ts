import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Search from '@/views/Search.vue'
import Tracks from '@/components/tracks/Tracks.vue'
import Artists from '@/components/artists/Artists.vue'
import Albums from '@/components/albums/Albums.vue'
import Favourite from '@/views/Favourite.vue'
import FavouriteTracks from '@/components/tracks/FavouriteTracks.vue'
import FavouriteArtists from '@/components/artists/FavouriteArtists.vue'
import FavouriteAlbums from '@/components/albums/FavouriteAlbums.vue'
import { useStoreUser } from '@/stores/storeUser'

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search,
    redirect: '/tracks',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'tracks',
        name: 'Tracks',
        component: Tracks
      },
      {
        path: 'artists',
        name: 'Artists',
        component: Artists
      },
      {
        path: 'albums',
        name: 'Albums',
        component: Albums
      }
    ]
  },

  {
    path: '/favourite',
    name: 'Favourite',
    component: Favourite,
    redirect: '/favourite/tracks',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'tracks',
        name: 'FavouriteTracks',
        component: FavouriteTracks
      },
      {
        path: 'artists',
        name: 'FavouriteArtists',
        component: FavouriteArtists
      },
      {
        path: 'albums',
        name: 'FavouriteAlbums',
        component: FavouriteAlbums
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { getAccessToken } = useStoreUser()
  if (to.path === '/login' && getAccessToken) {
    next('/')
    return
  }

  if (to.path === '/register' && getAccessToken) {
    next('/')
    return
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !getAccessToken) {
    next('/login')
    return
  }

  next()
})

export default router
