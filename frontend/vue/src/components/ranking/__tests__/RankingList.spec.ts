import { afterEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import sut from '@/components/ranking/RankingList.vue'

describe('RankingList.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it(`should create the component if mounted without 'rankings' prop`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should create the component if mounted with 'rankings' prop`, () => {
    wrapper = shallowMount(sut, { props: { rankings: [] } })
    expect(wrapper.exists()).toBeTruthy()
  })
})
