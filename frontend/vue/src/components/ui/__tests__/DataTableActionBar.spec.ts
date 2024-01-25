import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DOMWrapper, shallowMount } from '@vue/test-utils'

import AnimatedButton from '@/components/ui/AnimatedButton.vue'
import sut from '@/components/ui/DataTableActionBar.vue'

describe('DataTableActionBar.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it(`should create the component if mounted with required props`, () => {
    wrapper = shallowMount(sut, {
      props: {
        rowIndex: 0,
        rowData: {}
      }
    })
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should render an action bar with one action with icon`, () => {
    type FooType = {
      valueFoo: string
    }

    wrapper = shallowMount(sut<FooType>, {
      global: {
        components: {
          AnimatedButton
        },
        stubs: {
          AnimatedButton: false
        }
      },
      props: {
        actions: [{ label: 'Edit', type: 'EDIT' }],
        rowIndex: 0,
        rowData: { valueFoo: 'f00' }
      }
    })
    const actionBarWrapper = wrapper.find('.action-bar')
    const allButtons = actionBarWrapper.findAll('button') as Array<DOMWrapper<HTMLButtonElement>>
    expect(allButtons.length).toBe(1)
    expect(wrapper.find('edit-icon-stub').exists()).toBeTruthy()
  })

  it(`edit action emits 'edit-row'`, async () => {
    type FooType = {
      valueFoo: string
    }

    wrapper = shallowMount(sut<FooType>, {
      global: {
        components: {
          AnimatedButton
        },
        stubs: {
          AnimatedButton: false
        }
      },
      props: {
        actions: [{ label: 'Edit', type: 'EDIT' }],
        rowIndex: 0,
        rowData: { valueFoo: 'f00' }
      }
    })
    const buttonWrapper: DOMWrapper<HTMLButtonElement> = wrapper.find('button')
    expect(buttonWrapper.exists(), `'Edit' button is not in the test DOM.`).toBeTruthy()

    await buttonWrapper.trigger('click')
    await nextTick()

    expect(wrapper.emitted()).toHaveProperty('edit-row')
    expect(wrapper.emitted()['edit-row']).toHaveLength(1)
    expect(wrapper.emitted()['edit-row'][0]).toHaveLength(1)
    expect(wrapper.emitted()['edit-row'][0][0]).toStrictEqual({
      rowIndex: 0,
      rowData: { valueFoo: 'f00' }
    })
  })
})
