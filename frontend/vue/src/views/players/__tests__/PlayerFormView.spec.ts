import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import playersApi from '@/api/resources/players'

import sut from '@/views/players/PlayerFormView.vue'

vi.mock('@/api/resources/players')

describe('PlayerFormView.vue', () => {
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

  it(`should not call 'api.players.getPlayerByUsername()' if prop 'playerName' is provided`, () => {
    wrapper = shallowMount(sut, { props: {} })
    expect(playersApi.getPlayerByUsername).not.toHaveBeenCalled()
  })

  it(`should have 'Create New Player' heading`, () => {
    wrapper = shallowMount(sut, {
      global: {
        stubs: {
          PageHeading: false
        }
      }
    })
    expect(wrapper.find('.page-heading')?.text()).toBe('Create New Player')
  })

  it('should contain PlayerForm component', () => {
    wrapper = shallowMount(sut)
    expect(wrapper.find('player-form-stub')?.exists()).toBeTruthy()
  })

  it('should call showError() if api.players.getPlayerByUsername() throws an error', async () => {
    const testError = new Error('API Test Error')
    const getPlayerSpy = playersApi.getPlayerByUsername as Mock<any, any>
    getPlayerSpy.mockRejectedValueOnce(testError)

    wrapper = shallowMount(sut)
  })
})
