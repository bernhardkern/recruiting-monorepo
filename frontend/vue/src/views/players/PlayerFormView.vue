<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'

import api from '@/api'
import { getResponseBodyOrError, throwError } from '@/api/response-helper'
import type { Player } from '@/models/player'
import type { Nullable } from '@/types/utility'

import PlayerForm from '@/components/players/PlayerForm.vue'
import PageHeading from '@/components/ui/PageHeading.vue'

interface Props {
  username: string
}

const props: Props = {
  username: ''
}

const player = ref<Nullable<Player>>(null)

onBeforeMount(async () => {
  if (props.username) {
    await loadPlayer(props.username)
  }
})

async function loadPlayer(username: string) {
  const response = await api.players.getPlayerByUsername(username)
  const data = getResponseBodyOrError(response)
  throwError(data)
  player.value = data as Player
}

const isEditForm = computed(() => !!props.username)
const pageHeading = computed(() =>
  isEditForm.value ? `Edit player with username: ${props.username}` : 'Create New Player'
)
</script>

<template>
  <section>
    <PageHeading>{{ pageHeading }}</PageHeading>
    <PlayerForm :player="player" :isEditForm="isEditForm"></PlayerForm>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
}
</style>
