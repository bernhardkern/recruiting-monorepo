import { afterEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import sut from '@/components/matches/MatchList.vue'

describe('MatchList.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it(`should create the component if mounted without 'matches' prop`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should create the component if mounted with 'matches' prop`, () => {
    wrapper = shallowMount(sut, { props: { matches: [] } })
    expect(wrapper.exists()).toBeTruthy()
  })
})
