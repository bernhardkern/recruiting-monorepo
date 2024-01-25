<script setup lang="ts">
interface Props {
  id?: string
}
const props = defineProps<Props>()
</script>

<template>
  <section :id="props.id">
    <slot></slot>
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: flex-end;
  padding: 0.875rem 2.5rem;
  background-color: var(--color-page-heading-background);
}
section > :deep(*) {
  margin-left: 1rem;
}
section > :deep(*):first-child {
  margin-left: 0;
}
</style>
