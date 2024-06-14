import { afterEach, describe, expect, it, vi } from 'vitest'

import { useMockRouter } from '@/__tests__/_helpers/router'

import { useNavigate as sut } from '@/composables/routing/navigate'

describe('navigate.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('exported "useNavigate" function', () => {
    describe('navigateToEditPlayer()', () => {
      it('has "navigateToEditPlayer" function in returned object', () => {
        const sutResult = sut()
        expect(sutResult).toBeTruthy()
        const { navigateToEditPlayer } = sutResult
        expect(typeof navigateToEditPlayer).toBe('function')
      })

      it(`calls router.push to 'players.edit' with username of player`, async () => {
        const username = 'careBear3000'
        const { pushSpy } = useMockRouter()

        await sut().navigateToEditPlayer(username)

        expect(pushSpy).toHaveBeenCalledTimes(1)
        expect(pushSpy).toHaveBeenCalledWith({
          name: 'players.edit',
          params: {
            username: username
          }
        })
      })
    })

    describe('navigateToNewPlayer()', () => {
      it('has "navigateToNewPlayer" function in returned object', () => {
        const sutResult = sut()
        expect(sutResult).toBeTruthy()
        const { navigateToNewPlayer } = sutResult
        expect(typeof navigateToNewPlayer).toBe('function')
      })

      it(`calls router.push to 'players.new'`, async () => {
        const { pushSpy } = useMockRouter({ name: 'players' })

        await sut().navigateToNewPlayer()

        expect(pushSpy).toHaveBeenCalledTimes(1)
        expect(pushSpy).toHaveBeenCalledWith({
          name: 'players.new'
        })
      })
    })

    describe('navigateToNewMatch()', () => {
      it('has "navigateToNewMatch" function in returned object', () => {
        const sutResult = sut()
        expect(sutResult).toBeTruthy()
        const { navigateToNewMatch } = sutResult
        expect(typeof navigateToNewMatch).toBe('function')
      })

      it(`calls router.push to 'matches.new'`, async () => {
        const { pushSpy } = useMockRouter({ name: 'matches' })

        await sut().navigateToNewMatch()

        expect(pushSpy).toHaveBeenCalledTimes(1)
        expect(pushSpy).toHaveBeenCalledWith({
          name: 'matches.new'
        })
      })
    })

    describe('navigateToParentRoute()', () => {
      it('has "navigateToParentRoute" function in returned object', () => {
        const sutResult = sut()
        expect(sutResult).toBeTruthy()
        const { navigateToParentRoute } = sutResult
        expect(typeof navigateToParentRoute).toBe('function')
      })

      it(`calls router.push to 'players' if called with current route's name 'players.edit'`, async () => {
        const { pushSpy } = useMockRouter({ name: 'players.edit' })

        await sut().navigateToParentRoute()

        expect(pushSpy).toHaveBeenCalledTimes(1)
        expect(pushSpy).toHaveBeenCalledWith({
          name: 'players'
        })
      })
    })
  })
})
