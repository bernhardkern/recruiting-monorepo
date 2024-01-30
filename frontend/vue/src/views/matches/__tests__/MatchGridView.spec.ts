import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'
import { nextTick } from 'vue'
import { VueWrapper, shallowMount } from '@vue/test-utils'

import { useMockNavigate } from '@/__tests__/_helpers/navigate'
import { useMockToaster } from '@/__tests__/_helpers/toaster'

import matchesApi from '@/api/resources/matches'

import AnimatedButton from '@/components/ui/AnimatedButton.vue'

import sut from '@/views/matches/MatchGridView.vue'

vi.mock('@/api/resources/matches')

const { navigateToNewMatchMock } = useMockNavigate()
const { showErrorMock } = useMockToaster()

describe('MatchGridView.vue', () => {
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

  it(`should call the 'api.matches.getMatches()'`, () => {
    wrapper = shallowMount(sut)
    expect(matchesApi.getMatches).toHaveBeenCalledOnce()
  })

  it('should call showError() if api.matches.getMatches() throws an error', async () => {
    const apiActionMock = matchesApi.getMatches as Mock<any, any>
    apiActionMock.mockResolvedValueOnce(new Error('API Test Error'))

    wrapper = shallowMount(sut)

    await new Promise((resolve) => setTimeout(resolve, 250))

    expect(showErrorMock).toHaveBeenCalledTimes(1)
    expect(showErrorMock).toHaveBeenCalledWith('Failed to load matches: Error: API Test Error')
  })

  it(`should have 'Match Overview' heading`, () => {
    wrapper = shallowMount(sut, {
      global: {
        stubs: {
          PageHeading: false
        }
      }
    })
    expect(wrapper.find('.page-heading')?.text()).toBe('Match Overview')
  })

  it('should contain MatchList component', () => {
    wrapper = shallowMount(sut)
    expect(wrapper.find('match-list-stub')?.exists()).toBeTruthy()
  })

  it(`has an action bar with id 'match-list__action-bar'`, async () => {
    wrapper = shallowMount(sut, {
      global: {
        renderStubDefaultSlot: true
      }
    })
    const actionBarElement = wrapper.find('action-bar-stub')
    expect(actionBarElement.exists()).toBeTruthy()
    expect(actionBarElement.attributes()['id']).toBe('match-list__action-bar')
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

  it(`navigates to 'matches.new' route if 'Create' action is clicked`, async () => {
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

    expect(navigateToNewMatchMock).toHaveBeenCalled()
  })
})
