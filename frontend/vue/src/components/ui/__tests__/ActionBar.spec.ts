import { afterEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import sut from '@/components/ui/ActionBar.vue'

describe('ActionBar.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it(`should create the component`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should have an id if provided as prop`, () => {
    wrapper = shallowMount(sut, { props: { id: 'test-id' } })
    expect(wrapper.attributes()['id']).toBe('test-id')
  })
})
