import { afterEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import sut from '@/views/matches/MatchFormView.vue'

describe('MatchFormView.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it(`should create the view`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should have 'Create New Match' heading`, () => {
    wrapper = shallowMount(sut, {
      global: {
        stubs: {
          PageHeading: false
        }
      }
    })
    expect(wrapper.find('.page-heading')?.text()).toBe('Create New Match')
  })

  it('should contain MatchForm component', () => {
    wrapper = shallowMount(sut)
    expect(wrapper.find('match-form-stub')?.exists()).toBeTruthy()
  })
})
