<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import api from '@/api'
import { useNavigate } from '@/composables/routing/navigate'
import { getResponseBodyOrError, throwError } from '@/api/response-helper'
import { useToaster } from '@/composables/ui/toaster'
import type { Player } from '@/models/player'

import PlayerList from '@/components/players/PlayerList.vue'
import ActionBar from '@/components/ui/ActionBar.vue'
import AnimatedButton from '@/components/ui/AnimatedButton.vue'
import PageHeading from '@/components/ui/PageHeading.vue'

const { showError } = useToaster()

const players = ref<Array<Player>>([])

onBeforeMount(async () => {
  const response = await api.players.getPlayers()
  try {
    const data = getResponseBodyOrError(response)
    throwError(data)
    players.value = data as Array<Player>
  } catch (error) {
    showError(`Failed to load players: ${error}`)
  }
})

const { navigateToNewPlayer } = useNavigate()
function onCreate() {
  navigateToNewPlayer()
}
</script>

<template>
  <section id="player-grid-view">
    <PageHeading>Player Overview</PageHeading>
    <div class="page-with-heading">
      <PlayerList :players="players"></PlayerList>
      <ActionBar id="player-list__action-bar">
        <AnimatedButton default-form-button @click="onCreate">Create</AnimatedButton>
      </ActionBar>
    </div>
  </section>
</template>

<style scoped>
#player-grid-view {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.page-with-heading {
  display: flex;
  flex-direction: column;
  height: calc(100% - 64px);
  justify-content: stretch;
  align-items: stretch;
}

#player-list__action-bar {
  flex-shrink: 0;
}
</style>
