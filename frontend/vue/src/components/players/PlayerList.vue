<script setup lang="ts">
import { useNavigate } from '@/composables/routing/navigate'
import type { Player } from '@/models/player'
import type { ColumnDefinition, EditRowEventData } from '@/types/utility'

import DataTable from '@/components/ui/DataTable.vue'
import ScrollableLayout from '@/components/ui/ScrollableLayout.vue'

interface Props {
  players?: Array<Player>
}
const props = withDefaults(defineProps<Props>(), {
  players: () => []
})

const columnDefinitions: Array<ColumnDefinition<Player>> = [
  { label: 'ID', type: 'DATA', dataProperty: 'id' },
  { label: 'Username', type: 'DATA', dataProperty: 'username' },
  { label: 'Display Name', type: 'DATA', dataProperty: 'displayName' },
  { label: 'Email', type: 'DATA', dataProperty: 'email' },
  { label: 'Actions', type: 'ACTION', actions: [{ label: 'Edit', type: 'EDIT' }] }
]

const { navigateToEditPlayer } = useNavigate()
function onEditRow({ rowData: player }: EditRowEventData<Player>) {
  navigateToEditPlayer(player.username)
}
</script>

<template>
  <ScrollableLayout>
    <DataTable
      :column-definitions="columnDefinitions"
      :data="props.players"
      @edit-row="onEditRow"
    ></DataTable>
  </ScrollableLayout>
</template>
