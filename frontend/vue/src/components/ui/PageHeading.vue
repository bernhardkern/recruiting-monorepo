<template>
  <section class="page-heading">
    <h1><slot></slot></h1>
  </section>
</template>

<style scoped>
.page-heading {
  display: block;
  flex-shrink: 0;
  margin: 0;
  padding: 1rem;
  background-color: var(--color-page-heading-background);
  color: var(--color-page-heading-text);
}

.page-heading h1 {
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 2rem;
  text-align: left;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
