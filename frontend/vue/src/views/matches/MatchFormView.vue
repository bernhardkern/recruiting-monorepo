<script setup lang="ts">
import MatchForm from '@/components/matches/MatchForm.vue'
import PageHeading from '@/components/ui/PageHeading.vue'
</script>

<template>
  <section>
    <PageHeading>Create New Match</PageHeading>
    <MatchForm></MatchForm>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
}
</style>
