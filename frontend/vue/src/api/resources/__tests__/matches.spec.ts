import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'

import request from '@/api/request'
import { Outcome } from '@/models/enum/outcome'
import type { MatchResource } from '@/models/match'

import sut from '@/api/resources/matches'

vi.mock('@/api/request')
vi.mock('@/plugins/api-namespace', () => ({
  baseURL: {
    CHESS_ELO_CALCULATOR: 'testURL'
  }
}))

describe('matches.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getMatches', () => {
    it('calls request.get and returns a response', async () => {
      const testResponse: Array<MatchResource> = [
        {
          id: 'testId',
          whitePlayerUsername: 'White Mustermann',
          blackPlayerUsername: 'Black Mustermann',
          outcome: Outcome.DRAW,
          timestamp: 1602329862,
        }
      ]
      const requestGetSpy = request.get as Mock<any, any>
      requestGetSpy.mockResolvedValueOnce(testResponse)

      const response = await sut.getMatches()

      expect(requestGetSpy).toHaveBeenCalledOnce()
      expect(requestGetSpy).toHaveBeenCalledWith('testURL/matches')
      expect(response).toBe(testResponse)
    })

    it('calls request.get and returns an error', async () => {
      const testError = new Error('testError')
      const requestGetSpy = request.get as Mock<any, any>
      requestGetSpy.mockRejectedValueOnce(testError)

      await expect(sut.getMatches()).rejects.toThrowError(testError)

      expect(requestGetSpy).toHaveBeenCalledOnce()
      expect(requestGetSpy).toHaveBeenCalledWith('testURL/matches')
    })
  })

  describe('createMatch', () => {
    it('calls request.post and returns a response', async () => {
      const testResponse: MatchResource = {
        id: 'testId',
        whitePlayerUsername: 'White Mustermann',
        blackPlayerUsername: 'Black Mustermann',
        outcome: Outcome.DRAW,
        timestamp: 1602329862,
      }
      const requestPostSpy = request.post as Mock<any, any>
      requestPostSpy.mockResolvedValueOnce(testResponse)

      const createMatch = {
        whitePlayerUsername: 'White Mustermann',
        blackPlayerUsername: 'Black Mustermann',
        outcome: Outcome.DRAW,
      }
      const response = await sut.createMatch(createMatch)

      expect(requestPostSpy).toHaveBeenCalledOnce()
      expect(requestPostSpy).toHaveBeenCalledWith('testURL/matches', createMatch)
      expect(response).toStrictEqual(testResponse)
    })

    it('calls request.post and returns an error', async () => {
      const testError = new Error('testError')
      const requestPostSpy = request.post as Mock<any, any>
      requestPostSpy.mockRejectedValueOnce(testError)

      const createMatch = {
        whitePlayerUsername: 'White Mustermann',
        blackPlayerUsername: 'Black Mustermann',
        outcome: Outcome.DRAW,
      }
      await expect(sut.createMatch(createMatch)).rejects.toThrowError(testError)

      expect(requestPostSpy).toHaveBeenCalledOnce()
      expect(requestPostSpy).toHaveBeenCalledWith('testURL/matches', createMatch)
    })
  })
})
