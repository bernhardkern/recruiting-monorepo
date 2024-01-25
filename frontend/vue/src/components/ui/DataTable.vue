<script generic="D extends Record<string, any>" lang="ts" setup>
import type { ColumnDefinition, EditRowEventData } from '@/types/utility'

import DataTableActionBar from '@/components/ui/DataTableActionBar.vue'

interface Props {
  columnDefinitions?: Array<ColumnDefinition<D>>
  data?: Array<D>
}
const props = withDefaults(defineProps<Props>(), {
  columnDefinitions: () => [],
  data: () => []
})

const emit = defineEmits<{
  (e: 'edit-row', eventData: EditRowEventData<D>): void
}>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="(columnDefinition, index) in props.columnDefinitions" :key="index">
          {{ columnDefinition.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rowData, rowIndex) in props.data" :key="rowIndex">
        <td v-for="(columnDefinition, columnIndex) in props.columnDefinitions" :key="columnIndex">
          <template v-if="'DATA' === columnDefinition.type">
            {{ columnDefinition.dataProperty ? rowData[columnDefinition.dataProperty] : '' }}
          </template>
          <template v-else-if="'ACTION' === columnDefinition.type">
            <DataTableActionBar
              :actions="columnDefinition.actions"
              :rowIndex="rowIndex"
              :rowData="rowData"
              @edit-row="emit('edit-row', $event)"
            ></DataTableActionBar>
          </template>
        </td>
      </tr>
    </tbody>
    <tfoot></tfoot>
  </table>
</template>

<style scoped>
table {
  min-width: 100%;
  border: 0;
  border-spacing: 0;
  background-color: var(--color-table-background);
  margin: 0;
  padding: 0;
}

thead,
tbody,
tfoot {
  vertical-align: middle;
  margin: 0;
  padding: 0;
}

tr {
  color: var(--color-table-header-headline);
  height: 3.25rem;
  font-size: 0.875rem;
  margin: 0;
  padding: 0;
}

thead > tr {
  font-weight: 500;
  line-height: 1.375rem;
}

thead > tr > *,
tbody > tr > * {
  border-bottom: 1px solid var(--color-table-row-item-outline);
}

tbody > tr:last-child > * {
  border-bottom: 0;
}

tbody > tr {
  font-weight: 400;
  line-height: 1.25rem;
}

th,
td {
  padding: 0 1rem 0 1rem;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  font-weight: unset;
}
</style>
