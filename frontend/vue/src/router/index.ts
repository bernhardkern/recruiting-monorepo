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
          component: () => import('@/views/players/PlayerFormView.vue'),
          props: true
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
      children: [
        {
          path: '',
          name: 'matches',
          redirect: { name: 'matches.overview' }
        },
        {
          path: 'overview',
          name: 'matches.overview',
          component: () => import('@/views/matches/MatchGridView.vue')
        },
        {
          path: 'new',
          name: 'matches.new',
          component: () => import('@/views/matches/MatchFormView.vue')
        }
      ]
    },
    {
      path: '/ranking',
      component: () => import('@/views/ranking/RankingView.vue'),
      meta: { transition: 'slide-right' },
      children: [
        {
          path: '',
          name: 'ranking',
          redirect: { name: 'ranking.overview' }
        },
        {
          path: 'overview',
          name: 'ranking.overview',
          component: () => import('@/views/ranking/RankingGridView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'home' }
    }
  ]
})

export default router
