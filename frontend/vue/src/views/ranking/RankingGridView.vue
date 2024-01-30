<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

import api from '@/api'
import { getResponseBodyOrError, throwError } from '@/api/response-helper'
import { useToaster } from '@/composables/ui/toaster'
import type { Ranking } from '@/models/ranking'

import RankingList from '@/components/ranking/RankingList.vue'
import PageHeading from '@/components/ui/PageHeading.vue'

const { showError } = useToaster()

const rankings = ref<Array<Ranking>>([])

onBeforeMount(async () => {
  try {
    const response = await api.rankings.getRankings(15)
    const data = getResponseBodyOrError(response)
    throwError(data)
    rankings.value = data as Array<Ranking>
  } catch (error) {
    showError(`Failed to load ranking: ${error}`)
  }
})
</script>

<template>
  <section id="ranking-grid-view">
    <PageHeading>Ranking</PageHeading>
    <div class="page-with-heading">
      <RankingList :rankings="rankings"></RankingList>
    </div>
  </section>
</template>

<style scoped>
#ranking-grid-view {
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
</style>
@/models/ranking
