import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import { useMockToaster } from '@/__tests__/_helpers/toaster'

import rankingsApi from '@/api/resources/rankings'

import sut from '@/views/ranking/RankingGridView.vue'

vi.mock('@/api/resources/rankings')

const { showErrorMock } = useMockToaster()

describe('RankingGridView.vue', () => {
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

  it(`should call the 'api.rankings.getRankings()'`, () => {
    wrapper = shallowMount(sut)
    expect(rankingsApi.getRankings).toHaveBeenCalledOnce()
  })

  it('should call showError() if api.rankings.getRankings() throws an error', async () => {
    const apiActionMock = rankingsApi.getRankings as Mock<any, any>
    apiActionMock.mockResolvedValueOnce(new Error('API Test Error'))

    wrapper = shallowMount(sut)

    await new Promise((resolve) => setTimeout(resolve, 250))

    expect(showErrorMock).toHaveBeenCalledTimes(1)
    expect(showErrorMock).toHaveBeenCalledWith('Failed to load ranking: Error: API Test Error')
  })

  it(`should have 'Ranking' heading`, () => {
    wrapper = shallowMount(sut, {
      global: {
        stubs: {
          PageHeading: false
        }
      }
    })
    expect(wrapper.find('.page-heading')?.text()).toBe('Ranking')
  })

  it('should contain RankingList component', () => {
    wrapper = shallowMount(sut)
    expect(wrapper.find('ranking-list-stub')?.exists()).toBeTruthy()
  })
})
