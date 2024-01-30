import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'
import { nextTick } from 'vue'
import { VueWrapper, shallowMount } from '@vue/test-utils'

import { useMockNavigate } from '@/__tests__/_helpers/navigate'
import { useMockToaster } from '@/__tests__/_helpers/toaster'

import playersApi from '@/api/resources/players'

import AnimatedButton from '@/components/ui/AnimatedButton.vue'

import sut from '@/views/players/PlayerGridView.vue'

vi.mock('@/api/resources/players')

const { navigateToNewPlayerMock } = useMockNavigate()
const { showErrorMock } = useMockToaster()

describe('PlayerGridView.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    vi.restoreAllMocks()
  })

  it(`should create the view`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should call the 'api.players.getPlayers()'`, () => {
    wrapper = shallowMount(sut)
    expect(playersApi.getPlayers).toHaveBeenCalledOnce()
  })

  it('should call showError() if api.players.getPlayers() throws an error', async () => {
    const apiActionMock = playersApi.getPlayers as Mock<any, any>
    apiActionMock.mockResolvedValueOnce(new Error('API Test Error'))

    wrapper = shallowMount(sut)

    await new Promise((resolve) => setTimeout(resolve, 250))

    expect(showErrorMock).toHaveBeenCalledTimes(1)
    expect(showErrorMock).toHaveBeenCalledWith('Failed to load players: Error: API Test Error')
  })

  it(`should have 'Player Overview' heading`, () => {
    wrapper = shallowMount(sut, {
      global: {
        stubs: {
          PageHeading: false
        }
      }
    })
    expect(wrapper.find('.page-heading')?.text()).toBe('Player Overview')
  })

  it('should contain PlayerList component', () => {
    wrapper = shallowMount(sut)
    expect(wrapper.find('player-list-stub')?.exists()).toBeTruthy()
  })

  it(`has an action bar with id 'player-list__action-bar'`, async () => {
    wrapper = shallowMount(sut, {
      global: {
        renderStubDefaultSlot: true
      }
    })
    const actionBarElement = wrapper.find('action-bar-stub')
    expect(actionBarElement.exists()).toBeTruthy()
    expect(actionBarElement.attributes()['id']).toBe('player-list__action-bar')
  })

  it(`has a 'Create' action with prop 'defaultFormButton'`, async () => {
    wrapper = shallowMount(sut, {
      global: {
        renderStubDefaultSlot: true,
        components: { AnimatedButton }
      }
    })
    const actionBarElement = wrapper.find('action-bar-stub')
    const actionBarButtons = actionBarElement.findAllComponents(AnimatedButton)
    const createButton = actionBarButtons.find((e: VueWrapper) => 'Create' === e.text())
    expect(createButton.exists()).toBeTruthy()
    expect(createButton.attributes()['defaultformbutton']).toBeTruthy()
  })

  it(`navigates to 'players.new' route if 'Create' action is clicked`, async () => {
    wrapper = shallowMount(sut, {
      global: {
        renderStubDefaultSlot: true,
        components: { AnimatedButton }
      }
    })
    const actionBarElement = wrapper.find('action-bar-stub')
    const actionBarButtons = actionBarElement.findAllComponents(AnimatedButton) as Array<VueWrapper>
    const createButton = actionBarButtons.find((e: VueWrapper) => 'Create' === e.text())

    await createButton?.trigger('click')
    await nextTick()

    expect(navigateToNewPlayerMock).toHaveBeenCalled()
  })
})
