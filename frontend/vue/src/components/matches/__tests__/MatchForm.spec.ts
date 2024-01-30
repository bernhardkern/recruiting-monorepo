import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'
import { nextTick } from 'vue'
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils'

import { useMockNavigate } from '@/__tests__/_helpers/navigate'
import { useMockRouter } from '@/__tests__/_helpers/router'
import { useMockToaster } from '@/__tests__/_helpers/toaster'

import api from '@/api'
import { Outcome } from '@/models/enum/outcome'
import { matchFrontendToMatchResource } from '@/adapter/match'
import type { MatchFrontend, MatchResource } from '@/models/match'
import type { Player } from '@/models/player'

import AnimatedButton from '@/components/ui/AnimatedButton.vue'

import sut from '@/components/matches/MatchForm.vue'

const createMatchResponse: MatchResource = {
  id: 'testId',
  whitePlayerUsername: 'White Mustermann',
  blackPlayerUsername: 'Black Mustermann',
  outcome: Outcome.DRAW,
  timestamp: 1602329862
}
const getPlayersResponse: Array<Player> = [
  {
    id: '3e532304-a2fc-4040-ac0f-a619e241f172',
    username: 'careBear3000',
    displayName: 'Carey Bar',
    email: 'care4bears@barbar.com',
    elo: 2300
  },
  {
    id: 'ed54ecb0-9355-44ac-8b51-4e485936332d',
    username: 'lovingAndCaring4Bears',
    displayName: 'Berthold Kehr',
    email: 'bearthold@care.de',
    elo: 2300
  }
]

vi.mock('@/api/index', async () => ({
  default: {
    matches: {
      createMatch: vi.fn((match: MatchFrontend) => ({
        data: { ...createMatchResponse, ...matchFrontendToMatchResource(match) }
      }))
    },
    players: {
      getPlayers: vi.fn(() => ({ data: getPlayersResponse }))
    }
  }
}))

const { navigateToParentRouteMock } = useMockNavigate()

const { showErrorMock, showSuccessMock } = useMockToaster()

const { mockRouterPlugin } = useMockRouter({ name: 'matches.new' })

describe('MatchForm.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null

    vi.clearAllMocks()
  })

  it(`should create the component and calls getPlayers api`, () => {
    const apiActionMock = api.players.getPlayers as Mock
    wrapper = shallowMount(sut, { global: { plugins: [mockRouterPlugin] } })
    expect(wrapper.exists()).toBeTruthy()
    expect(apiActionMock).toHaveBeenCalledOnce()
  })

  it(`has a form action bar`, async () => {
    wrapper = shallowMount(sut, {
      global: {
        renderStubDefaultSlot: true,
        plugins: [mockRouterPlugin]
      }
    })
    const actionBarElement = wrapper.find('action-bar-stub')
    expect(actionBarElement.exists()).toBeTruthy()
  })

  describe(`'Cancel' form action`, () => {
    it(`has a 'Cancel' form action with prop 'formButton'`, async () => {
      wrapper = shallowMount(sut, {
        global: {
          renderStubDefaultSlot: true,
          components: { AnimatedButton },
          plugins: [mockRouterPlugin]
        }
      })
      const actionBarElement = wrapper.find('action-bar-stub')
      const actionBarButtons = actionBarElement.findAllComponents(AnimatedButton)
      const cancelButton = actionBarButtons.find((e: VueWrapper) => 'Cancel' === e.text())
      expect(cancelButton.exists()).toBeTruthy()
      expect(cancelButton.attributes()['formbutton']).toBeTruthy()
    })

    it(`navigates to parent route if 'Cancel' form action is clicked`, async () => {
      wrapper = shallowMount(sut, {
        global: {
          renderStubDefaultSlot: true,
          components: { AnimatedButton },
          plugins: [mockRouterPlugin]
        }
      })
      const actionBarElement = wrapper.find('action-bar-stub')
      const actionBarButtons = actionBarElement.findAllComponents(
        AnimatedButton
      ) as Array<VueWrapper>
      const cancelButton = actionBarButtons.find((e: VueWrapper) => 'Cancel' === e.text())

      await cancelButton?.trigger('click')
      await nextTick()

      expect(navigateToParentRouteMock).toHaveBeenCalledOnce()
    })
  })

  describe(`'Save' form action`, () => {
    it(`has a 'Save' submit form action with prop 'defaultFormButton'`, async () => {
      wrapper = shallowMount(sut, {
        global: {
          renderStubDefaultSlot: true,
          components: { AnimatedButton },
          plugins: [mockRouterPlugin]
        }
      })
      const actionBarElement = wrapper.find('action-bar-stub')
      const actionBarButtons = actionBarElement.findAllComponents(AnimatedButton)
      const saveButton = actionBarButtons.find((e: VueWrapper) => 'Save' === e.text())
      expect(saveButton.exists()).toBeTruthy()
      expect(saveButton.attributes()['defaultformbutton']).toBeTruthy()
      expect(saveButton.attributes()['type']).toBe('submit')
    })

    it(`does not navigate to parent route if 'Save' form action is clicked but API throws an error`, async () => {
      const apiActionMock = api.matches.createMatch as Mock
      apiActionMock.mockResolvedValueOnce(new Error('API Test Error'))
      wrapper = shallowMount(sut, {
        global: {
          renderStubDefaultSlot: true,
          components: { AnimatedButton, Calendar, Dropdown },
          plugins: [mockRouterPlugin]
        }
      })

      const matchFormData: MatchFrontend = {
        whitePlayerUsername: 'White Mustermann',
        blackPlayerUsername: 'Black Mustermann',
        outcome: Outcome.DRAW,
        timestamp: new Date(1706137200000).toUTCString()
      }
      await setDropdownValueByPlaceholder(
        wrapper,
        'White Player*',
        matchFormData.whitePlayerUsername
      )
      await setDropdownValueByPlaceholder(
        wrapper,
        'Black Player*',
        matchFormData.blackPlayerUsername
      )
      await setDropdownValueByPlaceholder(wrapper, 'Outcome*', matchFormData.outcome)
      await setCalendarValueByPlaceholder(wrapper, 'Date*', matchFormData.timestamp)

      const actionBarElement = wrapper.find('action-bar-stub')
      const actionBarButtons = actionBarElement.findAllComponents(
        AnimatedButton
      ) as Array<VueWrapper>
      const saveButton = actionBarButtons.find((e: VueWrapper) => 'Save' === e.text())

      await saveButton?.trigger('submit')
      await nextTick()

      expect(navigateToParentRouteMock).not.toHaveBeenCalled()
      await new Promise((resolve) => setTimeout(resolve, 250))

      expect(showErrorMock).toHaveBeenCalledTimes(1)
      expect(showSuccessMock).not.toHaveBeenCalled()
    })

    it(`navigates to parent route if 'Save' form action is clicked`, async () => {
      const apiActionMock = api.matches.createMatch as Mock
      wrapper = shallowMount(sut, {
        global: {
          renderStubDefaultSlot: true,
          components: { AnimatedButton, Calendar, Dropdown },
          plugins: [mockRouterPlugin]
        }
      })

      const matchFormData: MatchFrontend = {
        whitePlayerUsername: 'White Mustermann',
        blackPlayerUsername: 'Black Mustermann',
        outcome: Outcome.DRAW,
        timestamp: new Date(1706137200000).toUTCString()
      }
      const matchResource: MatchResource = {
        whitePlayerUsername: matchFormData.whitePlayerUsername,
        blackPlayerUsername: matchFormData.blackPlayerUsername,
        outcome: matchFormData.outcome,
        timestamp: 1706137200000
      }
      await setDropdownValueByPlaceholder(
        wrapper,
        'White Player*',
        matchFormData.whitePlayerUsername
      )
      await setDropdownValueByPlaceholder(
        wrapper,
        'Black Player*',
        matchFormData.blackPlayerUsername
      )
      await setDropdownValueByPlaceholder(wrapper, 'Outcome*', matchFormData.outcome)
      await setCalendarValueByPlaceholder(wrapper, 'Date*', matchFormData.timestamp)

      const actionBarElement = wrapper.find('action-bar-stub')
      const actionBarButtons = actionBarElement.findAllComponents(
        AnimatedButton
      ) as Array<VueWrapper>
      const saveButton = actionBarButtons.find((e: VueWrapper) => 'Save' === e.text())

      await saveButton?.trigger('submit')
      await nextTick()

      expect(navigateToParentRouteMock).not.toHaveBeenCalled()
      await new Promise((resolve) => setTimeout(resolve, 250))

      expect(apiActionMock).toHaveBeenCalledWith(matchResource)
      expect(showErrorMock).not.toHaveBeenCalled()
      expect(showSuccessMock).toHaveBeenCalledTimes(1)
      expect(navigateToParentRouteMock).toHaveBeenCalledOnce()
    })
  })
})

export async function expectThrowsError(callback: () => Promise<any>, errorMessage: string) {
  let error: any
  try {
    await callback()
  } catch (e) {
    error = e
  }
  expect(
    error.message,
    'You see that error in a unit test because "throwError(response)" is missing after an API call OR an await is missing at the API call!'
  ).toBe(errorMessage)
}

export function getInputByPlaceholder<NodeType extends Node>(
  wrapper: VueWrapper | DOMWrapper<NodeType>,
  placeholder: string
) {
  const allInputWrappers = wrapper.findAll<HTMLInputElement>('input')
  const inputWrapper = allInputWrappers.find(
    (inputElement) => inputElement.attributes()['placeholder'] === placeholder
  )
  return inputWrapper as DOMWrapper<NodeType> | undefined
}

export function getDropdownByPlaceholder<NodeType extends Node>(
  wrapper: VueWrapper | DOMWrapper<NodeType>,
  placeholder: string
) {
  const allDropdownWrappers = wrapper.findAllComponents(Dropdown) as Array<VueWrapper<Dropdown>>
  const dropdownWrapper = allDropdownWrappers.find(
    (dropdownComponent) => dropdownComponent.attributes()['placeholder'] === placeholder
  )
  return dropdownWrapper as VueWrapper<Dropdown> | undefined
}

export function getCalendarByPlaceholder<NodeType extends Node>(
  wrapper: VueWrapper | DOMWrapper<NodeType>,
  placeholder: string
) {
  const allCalendarWrappers = wrapper.findAllComponents(Calendar) as Array<VueWrapper<Calendar>>
  const calendarWrapper = allCalendarWrappers.find(
    (calendarComponent) => calendarComponent.attributes()['placeholder'] === placeholder
  )
  return calendarWrapper as VueWrapper<Calendar> | undefined
}

export async function setDropdownValueByPlaceholder<NodeType extends Node, ValueType>(
  wrapper: VueWrapper | DOMWrapper<NodeType>,
  placeholder: string,
  value: ValueType
) {
  const component = getDropdownByPlaceholder<NodeType>(wrapper, placeholder)
  expect(component?.exists(), `Dropdown with placeholder '${placeholder}' not found`).toBeTruthy()
  component?.vm.$emit('update:modelValue', value)
  await nextTick()
}

export async function setCalendarValueByPlaceholder<NodeType extends Node, ValueType>(
  wrapper: VueWrapper | DOMWrapper<NodeType>,
  placeholder: string,
  value: ValueType
) {
  const component = getCalendarByPlaceholder<NodeType>(wrapper, placeholder)
  expect(component?.exists(), `Calendar with placeholder '${placeholder}' not found`).toBeTruthy()
  component?.vm.$emit('update:modelValue', value)
  await nextTick()
}
