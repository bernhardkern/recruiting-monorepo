import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils'

import DataTableActionBar from '@/components/ui/DataTableActionBar.vue'
import sut from '@/components/ui/DataTable.vue'

describe('DataTable.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it(`should create the component if mounted without 'columnDefinitions' prop`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should create the component if mounted with 'columnDefinitions' prop`, () => {
    wrapper = shallowMount(sut, { props: { columnDefinitions: [] } })
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should have columns 'Foo' and 'Bar'`, () => {
    wrapper = shallowMount(sut, {
      props: {
        columnDefinitions: [
          { label: 'Foo', type: 'DATA' },
          { label: 'Bar', type: 'DATA' }
        ]
      }
    })
    const allTableHeadings = wrapper
      .findAll('th')
      .map((th: DOMWrapper<HTMLTableCellElement>) => th.element.textContent)
    expect(allTableHeadings).toContain('Foo')
    expect(allTableHeadings).toContain('Bar')
  })

  it(`should render a data row`, () => {
    type FooBarType = {
      valueFoo: string
      valueBar: string
    }

    wrapper = shallowMount(sut<FooBarType>, {
      props: {
        columnDefinitions: [
          { label: 'Foo', type: 'DATA', dataProperty: 'valueFoo' },
          { label: 'Bar', type: 'DATA' }
        ],
        data: [{ valueFoo: 'f00', valueBar: '8ar' }]
      }
    })
    const tbodyWrapper = wrapper.find('tbody')
    const allTableRows = tbodyWrapper
      .findAll('tr')
      .map((tr: DOMWrapper<HTMLTableRowElement>) => tr.element.textContent)
    expect(allTableRows.length).toBe(1)
    expect(allTableRows[0]).toBe('f00')
  })

  it(`should render an action bar`, () => {
    type FooType = {
      valueFoo: string
    }

    wrapper = shallowMount(sut<FooType>, {
      props: {
        columnDefinitions: [
          { label: 'Foo', type: 'DATA', dataProperty: 'valueFoo' },
          { label: 'Actions', type: 'ACTION', actions: [{ label: 'Edit', type: 'EDIT' }] }
        ],
        data: [{ valueFoo: 'f00' }]
      }
    })
    expect(wrapper.find('data-table-action-bar-stub').exists()).toBeTruthy()
  })

  it(`edit action emits 'edit-row'`, async () => {
    type FooType = {
      valueFoo: string
    }

    wrapper = shallowMount(sut<FooType>, {
      global: {
        components: {
          DataTableActionBar
        }
      },
      props: {
        columnDefinitions: [
          { label: 'Foo', type: 'DATA', dataProperty: 'valueFoo' },
          { label: 'Actions', type: 'ACTION', actions: [{ label: 'Edit', type: 'EDIT' }] }
        ],
        data: [{ valueFoo: 'f00' }]
      }
    })
    const actionBarWrapper = wrapper.findComponent(DataTableActionBar) as VueWrapper
    expect(actionBarWrapper.exists(), `action bar is not in the test DOM.`).toBeTruthy()

    actionBarWrapper.vm.$emit('edit-row', {
      rowIndex: 0,
      rowData: { valueFoo: 'f00' }
    })
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
