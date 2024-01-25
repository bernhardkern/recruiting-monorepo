import { afterEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import sut from '@/views/players/PlayersView.vue'

describe('PlayersView.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it('should create the view', () => {
    wrapper = shallowMount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should have no heading`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.find('.page-heading')?.exists()).toBeFalsy()
  })

  it(`should have a router view`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.find('router-view-stub')?.exists()).toBeTruthy()
  })
})
