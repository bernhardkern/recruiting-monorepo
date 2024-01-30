<script setup lang="ts">
import Toast from 'primevue/toast'
import { RouterLink, RouterView } from 'vue-router'
import { useTitle } from '@vueuse/core'

useTitle('vue')
</script>

<template>
  <main>
    <Toast />
    <header>
      <RouterLink :to="{ name: 'home' }">
        <img alt="Vue logo" src="@/assets/iits-cec.svg" width="64" height="64" />
      </RouterLink>
      <h1>Chess Elo Calculator</h1>
    </header>

    <aside>
      <nav>
        <!-- <RouterLink :to="{ name: 'players' }">Players</RouterLink> -->
        <!-- <RouterLink :to="{ name: 'matches' }">Matches</RouterLink> -->
        <!-- <RouterLink :to="{ name: 'ranking' }">Ranking</RouterLink> -->
      </nav>
    </aside>

    <RouterView v-slot="{ Component, route }" class="content">
      <Transition :name="(route?.meta?.transition as string) || 'fade'" mode="out-in" appear>
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped>
/* grid parts: header, navigation, routerView */
main {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 64px 3rem 1fr;
  grid-template-columns: 25rem 1fr;
  grid-template-areas:
    'header header'
    'navigation navigation'
    'routerView routerView';
}

header {
  grid-area: header;
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 1rem;
  background-color: var(--color-header-background);
  color: var(--color-header-text);
}

aside {
  grid-area: navigation;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  background-color: var(--color-nav-background);
  z-index: 10;
}

.content {
  grid-area: routerView;
  margin: 0;
  padding: 0;
}
/* end of grid parts: header, navigation, routerView */

header > a {
  margin: 0;
  padding: 0;
  max-height: 64px;
}

header > h1 {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.015625rem;
  line-height: 2rem;
  text-align: left;
  margin-top: auto;
  margin-bottom: auto;
}

nav {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  background-color: var(--color-link-background-active);
  cursor: default;
}

nav a {
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1rem;
  font-weight: medium;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (hover: hover) {
  nav a:hover {
    background-color: var(--color-link-background-hover);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }
}

@media (min-width: 1024px) {
  main {
    grid-template-areas:
      'header header'
      'navigation routerView'
      'navigation routerView';
  }

  aside {
    flex-direction: column;
  }

  nav {
    flex-direction: column;
    padding: 1rem;
  }

  nav a {
    height: 3rem;
    border-left: 0;
    font-weight: 400;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
  }
}
</style>
