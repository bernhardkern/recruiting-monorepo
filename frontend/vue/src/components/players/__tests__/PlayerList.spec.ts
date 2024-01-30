import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { VueWrapper, shallowMount } from '@vue/test-utils'

import type { Player } from '@/models/player'

import DataTable from '@/components/ui/DataTable.vue'

import sut from '@/components/players/PlayerList.vue'

describe('PlayerList.vue', () => {
  let wrapper: any

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    vi.restoreAllMocks()
  })

  it(`should create the component if mounted without 'players' prop`, () => {
    wrapper = shallowMount(sut)
    expect(wrapper.exists()).toBeTruthy()
  })

  it(`should create the component if mounted with 'players' prop`, () => {
    wrapper = shallowMount(sut, { props: { players: [] } })
    expect(wrapper.exists()).toBeTruthy()
  })
})
