import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils'
import { RouterLink } from 'vue-router'

import sut from '@/App.vue'

describe('App.vue', () => {
  let wrapper: any

  afterEach(() => {
    if (vi.isFakeTimers()) {
      vi.runAllTimers()
      vi.useRealTimers()
    }
    wrapper?.unmount()
    wrapper = null
  })

  it('should create the app', () => {
    wrapper = shallowMount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should have the 'vue' title`, () => {
    wrapper = shallowMount(sut)
    expect(window.document.title).toBe('vue')
  })

  it(`should render 'Chess Elo Calculator' header title`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.find('h1')?.text()).toContain('Chess Elo Calculator')
  })

  it(`should render 'home' link`, () => {
    wrapper = shallowMount(sut, { global: { components: { RouterLink } } })
    const routerLinkTargetInHeader = wrapper.find('header').findComponent(RouterLink).vm.to?.name
    expect(routerLinkTargetInHeader).toBe('home')
  })
})
