import { afterEach, describe, expect, it, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'

import sut from '@/components/ui/AnimatedButton.vue'

const animatePressMock = vi.fn()
const animateReleaseMock = vi.fn()
vi.mock('@/composables/animations/gsap-animations', () => ({
  useGsapAnimations: vi.fn(() => {
    return {
      animatePress: animatePressMock,
      animateRelease: animateReleaseMock
    }
  })
}))

describe('AnimatedButton.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    vi.restoreAllMocks()
  })

  it('mounts the component', async () => {
    wrapper = mount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`sets the type 'button' as default if not provided as prop`, async () => {
    wrapper = mount(sut) as VueWrapper
    expect(wrapper.attributes()['type']).toBe('button')
  })

  it(`sets the type 'reset' if provided as prop`, async () => {
    wrapper = mount(sut, { props: { type: 'reset' } }) as VueWrapper
    expect(wrapper.attributes()['type']).toBe('reset')
  })

  it(`sets the type 'submit' if provided as prop`, async () => {
    wrapper = mount(sut, { props: { type: 'submit' } }) as VueWrapper
    expect(wrapper.attributes()['type']).toBe('submit')
  })

  it(`applies no css class 'form-button' if the prop 'formButton' is false.`, async () => {
    wrapper = mount(sut, { props: { formButton: false } })
    expect(wrapper.classes()).not.toContain('form-button')
  })

  it(`applies the css class 'form-button' if the prop 'formButton' is true.`, async () => {
    wrapper = mount(sut, { props: { formButton: true } })
    expect(wrapper.classes()).toContain('form-button')
  })

  it(`applies neither css class 'form-button' nor 'form-button--default' if the prop 'defaultFormButton' is false.`, async () => {
    wrapper = mount(sut, { props: { defaultFormButton: false } })
    expect(wrapper.classes()).not.toContain('form-button')
    expect(wrapper.classes()).not.toContain('form-button--default')
  })

  it(`applies the css classes 'form-button' and 'form-button--default' if the prop 'defaultFormButton' is true.`, async () => {
    wrapper = mount(sut, { props: { defaultFormButton: true } })
    expect(wrapper.classes()).toContain('form-button')
    expect(wrapper.classes()).toContain('form-button--default')
  })

  it('calls "animatePress" if the button is mousedowned', async () => {
    wrapper = mount(sut)
    await wrapper.find('button').trigger('mousedown')
    expect(animatePressMock).toHaveBeenCalledOnce()
    expect(animateReleaseMock).not.toHaveBeenCalled()
  })

  it('calls "animateRelease" if the button is mouseuped', async () => {
    wrapper = mount(sut)
    await wrapper.find('button').trigger('mouseup')
    expect(animatePressMock).not.toHaveBeenCalled()
    expect(animateReleaseMock).toHaveBeenCalledOnce()
  })
})
