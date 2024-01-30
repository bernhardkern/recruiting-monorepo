<script setup lang="ts">
import type { MatchFrontend } from '@/models/match'
import type { ColumnDefinition } from '@/types/utility'

import DataTable from '@/components/ui/DataTable.vue'
import ScrollableLayout from '@/components/ui/ScrollableLayout.vue'

interface Props {
  matches?: Array<MatchFrontend>
}
const props = withDefaults(defineProps<Props>(), {
  matches: () => []
})

const columnDefinitions: Array<ColumnDefinition<MatchFrontend>> = [
  { label: 'ID', type: 'DATA', dataProperty: 'id' },
  { label: 'White Player', type: 'DATA', dataProperty: 'whitePlayerUsername' },
  { label: 'Black Player', type: 'DATA', dataProperty: 'blackPlayerUsername' },
  { label: 'Outcome', type: 'DATA', dataProperty: 'outcome' }
]
</script>

<template>
  <ScrollableLayout>
    <DataTable :column-definitions="columnDefinitions" :data="props.matches"></DataTable>
  </ScrollableLayout>
</template>
