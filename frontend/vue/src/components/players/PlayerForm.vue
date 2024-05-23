<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'

import api from '@/api'
import { useNavigate } from '@/composables/routing/navigate'
import { useToaster } from '@/composables/ui/toaster'
import type { Player } from '@/models/player'
import type { Nullable } from '@/types/utility'

import ActionBar from '@/components/ui/ActionBar.vue'
import AnimatedButton from '@/components/ui/AnimatedButton.vue'
import ScrollableLayout from '@/components/ui/ScrollableLayout.vue'
import FormField from '@/components/ui/FormField.vue'
import { getResponseBodyOrError, throwError } from '@/api/response-helper'
import { watch } from 'vue'

interface Props {
  player?: Nullable<Player>
  isEditForm?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  player: () => ({
    username: '',
    displayName: '',
    email: ''
  }),
  isEditForm: false
})

const { showError, showSuccess } = useToaster()

const validationRules = yup.object<Partial<Player>>({
  displayName: yup.string().required().label('Display Name'),
  email: yup.string().required().label('E-Mail'),
  username: yup.string().required().label('Username')
})

const { defineField, isFieldDirty, errors, handleSubmit } = useForm({
  validationSchema: validationRules,
  initialValues: props.player
})

const [username, usernameAttrs] = defineField('username')
const [displayName, displayNameAttrs] = defineField('displayName')
const [email, emailAttrs] = defineField('email')
const [elo, eloAttrs] = defineField('elo')

const { navigateToParentRoute } = useNavigate()
function onCancel() {
  navigateToParentRoute()
}

watch(
  () => props.player,
  (newVal) => {
    if (newVal) {
      username.value = newVal.username
      displayName.value = newVal.displayName
      email.value = newVal.email
      elo.value = newVal.elo
    }
  }
)

const onSubmit = handleSubmit.withControlled(async (player) => {
  if (props.isEditForm) {
    await api.players.updatePlayer(player)
  } else {
    const response = await api.players.createPlayer(player)

    try {
      const data = getResponseBodyOrError(response)
      throwError(data)
      showSuccess('Saved successfully')
      navigateToParentRoute()
    } catch (error) {
      showError(`Failed to save player: ${error}`)
    }
  }
})
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <ScrollableLayout class="form-fields__layout">
      <FormField>
        <template #default>
          <input
            v-model="username"
            v-bind="usernameAttrs"
            placeholder="Username*"
            :class="{ invalid: !!errors.username, dirty: isFieldDirty('username') }"
            :disabled="isEditForm"
          />
        </template>
        <template #errorMessage>
          <ErrorMessage name="username" />
        </template>
      </FormField>
      <FormField>
        <template #default>
          <input
            v-model="displayName"
            v-bind="displayNameAttrs"
            placeholder="Display Name*"
            :class="{ invalid: !!errors.displayName, dirty: isFieldDirty('displayName') }"
          />
        </template>
        <template #errorMessage>
          <ErrorMessage name="displayName" />
        </template>
      </FormField>
      <FormField>
        <template #default>
          <input
            v-model="email"
            v-bind="emailAttrs"
            placeholder="E-Mail*"
            :class="{ invalid: !!errors.email, dirty: isFieldDirty('email') }"
          />
        </template>
        <template #errorMessage>
          <ErrorMessage name="email" />
        </template>
      </FormField>
      <Transition name="fade">
        <FormField v-if="props.isEditForm">
          <template #default>
            <input v-model="elo" v-bind="eloAttrs" disabled placeholder="Elo" />
          </template>
        </FormField>
      </Transition>
    </ScrollableLayout>
    <ActionBar id="player-form__action-bar">
      <AnimatedButton form-button @click.stop="onCancel">Cancel</AnimatedButton>
      <AnimatedButton default-form-button type="submit">Save</AnimatedButton>
    </ActionBar>
  </form>
</template>

<style scoped>
form {
  width: 100%;
  height: calc(100% - 64px);
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    'formFields'
    'actionBar';
}

.form-fields__layout {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  grid-area: formFields;
  justify-content: flex-start;
}
.form-fields__layout > * {
  padding-bottom: 1rem;
}
.form-fields__layout > *:last-child {
  padding-bottom: 0;
}

#player-form__action-bar {
  grid-area: actionBar;
}

input:disabled {
  background-color: #524f4f;
  color: #9c9c9c;
  cursor: not-allowed;
  border: 1px solid #524f4f;
}
</style>
