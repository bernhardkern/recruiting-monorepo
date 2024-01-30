import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'
import { nextTick } from 'vue'
import { VueWrapper, shallowMount } from '@vue/test-utils'

import { useMockNavigate } from '@/__tests__/_helpers/navigate'
import { useMockRouter } from '@/__tests__/_helpers/router'
import { useMockToaster } from '@/__tests__/_helpers/toaster'

import api from '@/api'
import type { Player } from '@/models/player'

import AnimatedButton from '@/components/ui/AnimatedButton.vue'

import sut from '@/components/players/PlayerForm.vue'

const createPlayerResponse: Player = {
  id: 'DAF924F7-98DC-45B7-AD5E-5A847571091B',
  username: 'Max Mustermann',
  displayName: 'Maxi',
  email: 'max.mustermann@iits-consulting.de',
  elo: 1337
}

vi.mock('@/api/index', async () => ({
  default: {
    players: {
      createPlayer: vi.fn((player: Player) => ({ data: { ...createPlayerResponse, ...player } }))
    }
  }
}))

const { navigateToParentRouteMock } = useMockNavigate()

const { showErrorMock, showSuccessMock } = useMockToaster()

const { mockRouterPlugin } = useMockRouter({ name: 'players.edit' })

describe('PlayerForm.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null

    vi.clearAllMocks()
  })

  it(`should create the component`, () => {
    wrapper = shallowMount(sut, { global: { plugins: [mockRouterPlugin] } })
    expect(wrapper.exists()).toBeTruthy()
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
    const actionBarButtons = actionBarElement.findAllComponents(AnimatedButton) as Array<VueWrapper>
    const cancelButton = actionBarButtons.find((e: VueWrapper) => 'Cancel' === e.text())

    await cancelButton?.trigger('click')
    await nextTick()

    expect(navigateToParentRouteMock).toHaveBeenCalledOnce()
  })

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

  describe('form is in create player state', () => {
    it(`does not navigate to parent route if 'Save' form action is clicked but API throws an error`, async () => {
      const apiActionMock = api.players.createPlayer as Mock
      apiActionMock.mockResolvedValueOnce(new Error('API Test Error'))

      wrapper = shallowMount(sut, {
        props: {
          isEditForm: false,
          player: {
            username: 'foo',
            displayName: 'Foo',
            email: 'foo@bar.de'
          }
        },
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
      const saveButton = actionBarButtons.find((e: VueWrapper) => 'Save' === e.text())

      await saveButton?.trigger('submit')
      await nextTick()

      expect(navigateToParentRouteMock).not.toHaveBeenCalled()
      await new Promise((resolve) => setTimeout(resolve, 250))

      expect(showErrorMock).toHaveBeenCalledTimes(1)
      expect(showSuccessMock).not.toHaveBeenCalled()
    })

    it(`navigates to parent route if 'Save' form action is clicked`, async () => {
      const apiActionMock = api.players.createPlayer as Mock
      const playerFormData = {
        username: 'foo',
        displayName: 'Foo',
        email: 'foo@bar.de'
      }
      wrapper = shallowMount(sut, {
        props: {
          isEditForm: false,
          player: playerFormData
        },
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
      const saveButton = actionBarButtons.find((e: VueWrapper) => 'Save' === e.text())

      await saveButton?.trigger('submit')
      await nextTick()

      expect(navigateToParentRouteMock).not.toHaveBeenCalled()
      await new Promise((resolve) => setTimeout(resolve, 250))

      expect(apiActionMock).toHaveBeenCalledWith(playerFormData)
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
