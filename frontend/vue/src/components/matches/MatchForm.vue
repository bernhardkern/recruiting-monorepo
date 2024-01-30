<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate'
import { onBeforeMount, ref } from 'vue'
// @ts-ignore
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import * as yup from 'yup'

import api from '@/api'
import { getResponseBodyOrError, throwError } from '@/api/response-helper'
import { useNavigate } from '@/composables/routing/navigate'
import { useToaster } from '@/composables/ui/toaster'
import { outcomeOptions } from '@/models/enum/outcome'
import { matchFrontendToMatchResource } from '@/adapter/match'
import type { MatchFrontend } from '@/models/match'
import type { Player } from '@/models/player'

import ActionBar from '@/components/ui/ActionBar.vue'
import AnimatedButton from '@/components/ui/AnimatedButton.vue'
import ScrollableLayout from '@/components/ui/ScrollableLayout.vue'
import FormField from '@/components/ui/FormField.vue'

const { showError, showSuccess } = useToaster()

const validationRules = yup.object<Partial<MatchFrontend>>({
  whitePlayerUsername: yup.string().required().label('White Player'),
  blackPlayerUsername: yup.string().required().label('Black Player'),
  outcome: yup.string().required().label('Outcome'),
  timestamp: yup.string().required().label('Date')
})

const { defineField, isFieldDirty, errors, handleSubmit } = useForm<MatchFrontend>({
  validationSchema: validationRules
})

const [whitePlayerUsername, whitePlayerUsernameAttrs] = defineField('whitePlayerUsername')
const [blackPlayerUsername, blackPlayerUsernameAttrs] = defineField('blackPlayerUsername')
const [outcome, outcomeAttrs] = defineField('outcome')
const [timestamp, timestampAttrs] = defineField('timestamp')

const { navigateToParentRoute } = useNavigate()
function onCancel() {
  navigateToParentRoute()
}

const onSubmit = handleSubmit.withControlled(async (match) => {
  const matchResource = matchFrontendToMatchResource(match)
  const response = await api.matches.createMatch(matchResource)
  try {
    const data = getResponseBodyOrError(response)
    throwError(data)
    showSuccess('Saved successfully')
    navigateToParentRoute()
  } catch (error) {
    showError(`Failed to save match: ${error}`)
  }
})

const allPlayers = ref<Array<Player>>([])
const loadPlayers = async () => {
  const response = await api.players.getPlayers()
  try {
    const data = getResponseBodyOrError(response)
    throwError(data)
    allPlayers.value = data as Array<Player>
  } catch (error) {
    showError(`Failed to load players: ${error}`)
  }
}

onBeforeMount(async () => {
  await loadPlayers()
})

defineExpose({
  whitePlayerUsername, //
  blackPlayerUsername,
  outcome,
  timestamp
})
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <ScrollableLayout class="form-fields__layout">
      <FormField>
        <template #default>
          <Dropdown
            v-model="whitePlayerUsername"
            :options="allPlayers"
            optionLabel="displayName"
            optionValue="displayName"
            placeholder="White Player*"
            class="w-full md:w-14rem"
            v-bind="whitePlayerUsernameAttrs"
            :class="{
              'p-invalid': !!errors.whitePlayerUsername,
              'p-dirty': isFieldDirty('whitePlayerUsername')
            }"
          />
        </template>
        <template #errorMessage>
          <ErrorMessage name="whitePlayerUsername" />
        </template>
      </FormField>
      <FormField>
        <template #default>
          <Dropdown
            v-model="blackPlayerUsername"
            :options="allPlayers"
            optionLabel="displayName"
            optionValue="displayName"
            placeholder="Black Player*"
            class="w-full md:w-14rem"
            v-bind="blackPlayerUsernameAttrs"
            :class="{
              'p-invalid': !!errors.blackPlayerUsername,
              'p-dirty': isFieldDirty('blackPlayerUsername')
            }"
          />
        </template>
        <template #errorMessage>
          <ErrorMessage name="blackPlayerUsername" />
        </template>
      </FormField>
      <FormField>
        <template #default>
          <Dropdown
            v-model="outcome"
            :options="outcomeOptions"
            placeholder="Outcome*"
            class="w-full md:w-14rem"
            v-bind="outcomeAttrs"
            :class="{ 'p-invalid': !!errors.outcome, 'p-dirty': isFieldDirty('outcome') }"
          />
        </template>
        <template #errorMessage>
          <ErrorMessage name="outcome" />
        </template>
      </FormField>
      <FormField>
        <template #default>
          <Calendar
            v-model="timestamp"
            showIcon
            iconDisplay="input"
            placeholder="Date*"
            class="w-full md:w-14rem"
            v-bind="timestampAttrs"
            :class="{ 'p-invalid': !!errors.timestamp, 'p-dirty': isFieldDirty('timestamp') }"
          />
        </template>
        <template #errorMessage>
          <ErrorMessage name="timestamp" />
        </template>
      </FormField>
    </ScrollableLayout>
    <ActionBar id="match-form__action-bar">
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

#match-form__action-bar {
  grid-area: actionBar;
}
</style>
