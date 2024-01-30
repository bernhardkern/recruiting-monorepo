import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'

import request from '@/api/request'
import type { Ranking } from '@/models/ranking'

import sut from '@/api/resources/rankings'

vi.mock('@/api/request')
vi.mock('@/plugins/api-namespace', () => ({
  baseURL: {
    CHESS_ELO_CALCULATOR: 'testURL'
  }
}))

describe('rankings.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getRankings', () => {
    it('calls request.get and returns a response', async () => {
      const testPlayer = {
        displayName: 'BeMax Mustermann',
        email: 'max.mustermann@iits-consulting.de',
        username: 'BestMaxEuWest',
        elo: 69
      }

      const testResponse: Array<Ranking> = [
        { ...testPlayer, id: 'testId-1', rank: 1 },
        { ...testPlayer, id: 'testId-2', rank: 2 },
        { ...testPlayer, id: 'testId-3', rank: 3 }
      ]
      const requestGetSpy = request.get as Mock<any, any>
      requestGetSpy.mockResolvedValueOnce(testResponse)

      const response = await sut.getRankings(testResponse.length)

      expect(requestGetSpy).toHaveBeenCalledOnce()
      expect(requestGetSpy).toHaveBeenCalledWith(`testURL/rankings?top=${testResponse.length}`)
      expect(response).toBe(testResponse)
    })

    it('calls request.get and returns an error', async () => {
      const testError = new Error('testError')
      const requestGetSpy = request.get as Mock<any, any>
      requestGetSpy.mockRejectedValueOnce(testError)

      await expect(sut.getRankings(3)).rejects.toThrowError(testError)

      expect(requestGetSpy).toHaveBeenCalledOnce()
      expect(requestGetSpy).toHaveBeenCalledWith('testURL/rankings?top=3')
    })
  })
})
