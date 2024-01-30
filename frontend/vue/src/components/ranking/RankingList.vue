<script setup lang="ts">
import type { Ranking } from '@/models/ranking'
import type { ColumnDefinition } from '@/types/utility'

import DataTable from '@/components/ui/DataTable.vue'
import ScrollableLayout from '@/components/ui/ScrollableLayout.vue'

interface Props {
  rankings?: Array<Ranking>
}
const props = withDefaults(defineProps<Props>(), {
  rankings: () => []
})

const columnDefinitions: Array<ColumnDefinition<Ranking>> = [
  { label: 'Rank', type: 'DATA', dataProperty: 'rank' },
  { label: 'Elo', type: 'DATA', dataProperty: 'elo' },
  { label: 'Username', type: 'DATA', dataProperty: 'username' },
  { label: 'Display Name', type: 'DATA', dataProperty: 'displayName' },
  { label: 'Email', type: 'DATA', dataProperty: 'email' }
]
</script>

<template>
  <ScrollableLayout>
    <DataTable :column-definitions="columnDefinitions" :data="props.rankings"></DataTable>
  </ScrollableLayout>
</template>
@/models/ranking
