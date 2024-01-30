<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import api from '@/api'
import { useNavigate } from '@/composables/routing/navigate'
import { getResponseBodyOrError, throwError } from '@/api/response-helper'
import { useToaster } from '@/composables/ui/toaster'
import type { MatchFrontend, MatchResource } from '@/models/match'
import { matchResourceToMatchFrontend } from '@/adapter/match'

import MatchList from '@/components/matches/MatchList.vue'
import ActionBar from '@/components/ui/ActionBar.vue'
import AnimatedButton from '@/components/ui/AnimatedButton.vue'
import PageHeading from '@/components/ui/PageHeading.vue'

const { showError } = useToaster()

const matches = ref<Array<MatchFrontend>>([])

onBeforeMount(async () => {
  const response = await api.matches.getMatches()
  try {
    const data = getResponseBodyOrError(response)
    throwError(data)
    matches.value = (data as Array<MatchResource>).map((match) =>
      matchResourceToMatchFrontend(match)
    )
  } catch (error) {
    showError(`Failed to load matches: ${error}`)
  }
})

const { navigateToNewMatch } = useNavigate()
function onCreate() {
  navigateToNewMatch()
}
</script>

<template>
  <section id="match-grid-view">
    <PageHeading>Match Overview</PageHeading>
    <div class="page-with-heading">
      <MatchList :matches="matches"></MatchList>
      <ActionBar id="match-list__action-bar">
        <AnimatedButton default-form-button @click="onCreate">Create</AnimatedButton>
      </ActionBar>
    </div>
  </section>
</template>

<style scoped>
#match-grid-view {
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

#match-list__action-bar {
  flex-shrink: 0;
}
</style>
