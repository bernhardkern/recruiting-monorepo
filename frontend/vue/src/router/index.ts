import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/players',
      component: () => import('@/views/players/PlayersView.vue'),
      meta: { transition: 'slide-left' },
      children: [
        {
          path: '',
          name: 'players',
          redirect: { name: 'players.overview' }
        },
        {
          path: 'overview',
          name: 'players.overview',
          component: () => import('@/views/players/PlayerGridView.vue')
        },
        {
          path: ':playerName/edit',
          name: 'players.edit',
          component: () => import('@/views/players/PlayerFormView.vue')
        },
        {
          path: 'new',
          name: 'players.new',
          component: () => import('@/views/players/PlayerFormView.vue')
        }
      ]
    },
    {
      path: '/matches',
      component: () => import('@/views/matches/MatchesView.vue'),
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('@/views/ranking/RankingView.vue'),
      meta: { transition: 'slide-right' }
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'home' }
    }
  ]
})

export default router
