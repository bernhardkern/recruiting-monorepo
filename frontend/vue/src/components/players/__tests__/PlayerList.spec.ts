import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { VueWrapper, shallowMount } from '@vue/test-utils'

import type { Player } from '@/models/player'

import DataTable from '@/components/ui/DataTable.vue'

import sut from '@/components/players/PlayerList.vue'

const navigateToEditPlayerMock = vi.fn()
vi.mock('@/composables/routing/navigate', () => ({
  useNavigate: vi.fn(() => {
    return {
      navigateToEditPlayer: navigateToEditPlayerMock
    }
  })
}))

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

  it(`should call navigateToEditPlayer() if data table emits event 'edit-row'`, async () => {
    const testPlayer: Player = {
      id: '3e532304-a2fc-4040-ac0f-a619e241f172',
      username: 'careBear3000',
      displayName: 'Carey Bar',
      email: 'care4bears@barbar.com',
      elo: 2300
    }
    wrapper = shallowMount(sut, {
      global: {
        renderStubDefaultSlot: true,
        components: {
          DataTable
        }
      },
      props: {
        players: [testPlayer] as Array<Player>
      }
    })

    const dataTableWrapper = wrapper.findComponent(DataTable) as VueWrapper
    expect(dataTableWrapper.exists(), `data table is not in the test DOM.`).toBeTruthy()

    dataTableWrapper.vm.$emit('edit-row', {
      rowIndex: 0,
      rowData: testPlayer
    })
    await nextTick()

    expect(navigateToEditPlayerMock).toHaveBeenCalledOnce()
    expect(navigateToEditPlayerMock).toHaveBeenCalledWith(testPlayer.username)
  })
})
