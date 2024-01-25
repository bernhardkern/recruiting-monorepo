import { afterEach, describe, expect, it } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'

import sut from '@/components/ui/PageHeading.vue'

describe('PageHeading.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it('should create the component', () => {
    wrapper = shallowMount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should have no heading when default slot is empty`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.text()).toBe('')
  })

  it(`should have "page-heading" class set`, () => {
    wrapper = mount(sut)
    expect(wrapper.classes()).toContain('page-heading')
  })

  it(`should have "Test Heading" heading when default slot is "Test Heading"`, () => {
    const WrappingComponent = {
      template: '<sut>Test Heading</sut>'
    }

    wrapper = mount(WrappingComponent, { global: { components: { sut } } })

    expect(wrapper.text()).toBe('Test Heading')
  })
})
