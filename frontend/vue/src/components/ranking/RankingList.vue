<script setup lang="ts">
import type { RankingFrontend, RankingResource } from '@/models/ranking'
import type { ColumnDefinition } from '@/types/utility'

import DataTable from '@/components/ui/DataTable.vue'
import ScrollableLayout from '@/components/ui/ScrollableLayout.vue'
import { computed } from 'vue'
import { rankingResourceToRankingFrontend } from '@/adapter/rank'

interface Props {
  rankings?: Array<RankingResource>
}
const props = withDefaults(defineProps<Props>(), {
  rankings: () => []
})

const rankings = computed(() => props.rankings.map(rankingResourceToRankingFrontend))

const columnDefinitions: Array<ColumnDefinition<RankingFrontend>> = [
  { label: 'Rank', type: 'DATA', dataProperty: 'rank' },
  { label: 'Elo', type: 'DATA', dataProperty: 'elo' },
  { label: 'Username', type: 'DATA', dataProperty: 'username' },
  { label: 'Display Name', type: 'DATA', dataProperty: 'displayName' },
  { label: 'Email', type: 'DATA', dataProperty: 'email' }
]
</script>

<template>
  <ScrollableLayout>
    <DataTable :column-definitions="columnDefinitions" :data="rankings"></DataTable>
  </ScrollableLayout>
</template>
@/models/ranking
