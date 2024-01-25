<script lang="ts" setup>
import { ref } from 'vue'
import { useGsapAnimations } from '@/composables/animations/gsap-animations'

interface Props {
  defaultFormButton?: boolean
  formButton?: boolean
  type?: 'button' | 'reset' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  defaultFormButton: false,
  formButton: false,
  type: 'button'
})

const buttonRef = ref()
const { animatePress, animateRelease } = useGsapAnimations()

function onMouseDown() {
  document.addEventListener('mouseup', onMouseUp)
  animatePress(buttonRef.value)
}
function onMouseUp(event: MouseEvent) {
  if ('mouseup' === event?.type) {
    document.removeEventListener('mouseup', onMouseUp)
    animateRelease(buttonRef.value)
  }
}
</script>

<template>
  <button
    ref="buttonRef"
    :type="props.type"
    :class="{
      'form-button': props.formButton || props.defaultFormButton,
      'form-button--default': props.defaultFormButton
    }"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  background-color: var(--color-button-background);
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: var(--color-button-text);
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  padding: 0.6em 1.2em;
  transition:
    background-color 0.25s,
    border-color 0.25s,
    color 0.25s;
}
@media (hover: hover) {
  button:hover {
    background-color: var(--color-button-background-hover);
    border-color: var(--color-button-hover);
    color: var(--color-button-text-hover);
  }
}
button:active {
  background-color: var(--color-button-background-active);
}

.form-button {
  color: var(--color-text);
}
@media (hover: hover) {
  .form-button:hover {
    border-color: transparent;
    color: var(--color-button-text-hover);
  }
}

.form-button--default {
  background-color: var(--color-button-background-default);
}
@media (hover: hover) {
  .form-button--default:hover {
    background-color: var(--color-button-background-default-hover);
  }
}
.form-button--default:active {
  background-color: var(--color-button-background-default-active);
}
</style>
