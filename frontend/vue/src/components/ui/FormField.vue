<script lang="ts" setup>
defineSlots<{
  default?: () => any
  errorMessage?: () => any
}>()
</script>

<template>
  <div class="form-field">
    <div class="form-field__input-wrapper">
      <slot></slot>
    </div>
    <div class="form-field__error-wrapper">
      <Transition name="fade">
        <slot name="errorMessage"></slot>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: stretch;
}

.form-field__input-wrapper,
.form-field__error-wrapper {
  width: 100%;
}

.form-field__input-wrapper {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: stretch;
}

.form-field__error-wrapper {
  color: var(--color-form-field-error-text);
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  height: 1.375rem;
  margin: 0;
  padding: 0 1rem;
}
</style>
