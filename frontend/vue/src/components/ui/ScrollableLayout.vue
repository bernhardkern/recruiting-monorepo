<template>
  <div class="scrollable-layout">
    <slot></slot>
  </div>
</template>

<style scoped>
.scrollable-layout {
  height: 100%;
  padding: 2.5rem;
  overflow: auto;
  margin: 0;
}
</style>
