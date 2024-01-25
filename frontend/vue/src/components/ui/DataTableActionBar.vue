<script generic="D extends Record<string, any>" lang="ts" setup>
import type { ColumnDefinitionAction } from '@/types/utility'

import EditIcon from '@/components/icons/IconIcons8Edit.vue'
import AnimatedButton from '@/components/ui/AnimatedButton.vue'

interface Props {
  actions?: Array<ColumnDefinitionAction>
  rowIndex: number
  rowData: D
}
const props = withDefaults(defineProps<Props>(), {
  actions: () => []
})

const emit = defineEmits<{
  (e: 'edit-row', eventData: { rowIndex: number; rowData: D }): void
}>()
</script>

<template>
  <div class="action-bar">
    <template v-for="(action, actionIndex) in props.actions" :key="actionIndex">
      <AnimatedButton
        v-if="'EDIT' === action.type"
        class="action-button--with-icon"
        @click="emit('edit-row', { rowIndex: props.rowIndex, rowData: props.rowData })"
      >
        <EditIcon class="action-button__icon"></EditIcon>
      </AnimatedButton>
    </template>
  </div>
</template>

<style scoped>
.action-button--with-icon {
  height: 3rem;
  width: 3rem;
  /* modify main.css button styles */
  background-color: transparent;
  border: 0px solid transparent;
  border-radius: 1.5rem;
  padding: 0.75rem;
}

.action-button__icon {
  fill: var(--color-text);
}

@media (hover: hover) {
  .action-button--with-icon:hover > .action-button__icon {
    fill: var(--color-button-text-hover);
  }
}
</style>
