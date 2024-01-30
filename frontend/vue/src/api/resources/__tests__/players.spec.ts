import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'
import request from '@/api/request'
import type { Player } from '@/models/player'
import sut from '@/api/resources/players'

vi.mock('@/api/request')
vi.mock('@/plugins/api-namespace', () => ({
  baseURL: {
    CHESS_ELO_CALCULATOR: 'testURL'
  }
}))

describe('players.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getPlayers', () => {
    it('calls request.get and returns a response', async () => {
      const testResponse: Array<Player> = [
        {
          id: 'testId',
          displayName: 'BeMax Mustermann',
          email: 'max.mustermann@iits-consulting.de',
          username: 'BestMaxEuWest',
          elo: 69
        }
      ]
      const requestGetSpy = request.get as Mock<any, any>
      requestGetSpy.mockResolvedValueOnce(testResponse)

      const response = await sut.getPlayers()

      expect(requestGetSpy).toHaveBeenCalledOnce()
      expect(requestGetSpy).toHaveBeenCalledWith('testURL/players')
      expect(response).toBe(testResponse)
    })

    it('calls request.get and returns an error', async () => {
      const testError = new Error('testError')
      const requestGetSpy = request.get as Mock<any, any>
      requestGetSpy.mockRejectedValueOnce(testError)

      await expect(sut.getPlayers()).rejects.toThrowError(testError)

      expect(requestGetSpy).toHaveBeenCalledOnce()
      expect(requestGetSpy).toHaveBeenCalledWith('testURL/players')
    })
  })

  describe('createPlayer', () => {
    it('calls request.post and returns a response', async () => {
      const testResponse: Player = {
        id: 'testId',
        displayName: 'Max Mustermann',
        email: 'max.mustermann@iits-consulting.de',
        username: 'BestMaxEuWest',
        elo: 69
      }
      const requestPostSpy = request.post as Mock<any, any>
      requestPostSpy.mockResolvedValueOnce(testResponse)

      const createPlayer = {
        displayName: 'Max Mustermann',
        email: 'max.mustermann@iits-consulting.de',
        username: 'BestMaxEuWest'
      }
      const response = await sut.createPlayer(createPlayer)

      expect(requestPostSpy).toHaveBeenCalledOnce()
      expect(requestPostSpy).toHaveBeenCalledWith('testURL/players', createPlayer)
      expect(response).toStrictEqual(testResponse)
    })

    it('calls request.post and returns an error', async () => {
      const testError = new Error('testError')
      const requestPostSpy = request.post as Mock<any, any>
      requestPostSpy.mockRejectedValueOnce(testError)

      const createPlayer = {
        displayName: 'Max Mustermann',
        email: 'max.mustermann@iits-consulting.de',
        username: 'BestMaxEuWest'
      }
      await expect(sut.createPlayer(createPlayer)).rejects.toThrowError(testError)

      expect(requestPostSpy).toHaveBeenCalledOnce()
      expect(requestPostSpy).toHaveBeenCalledWith('testURL/players', createPlayer)
    })
  })

  describe('getPlayerByUsername', () => {
    it('calls request.get and returns a response', async () => {
      const testResponse: Player = {
        id: 'testId',
        displayName: 'Max Mustermann',
        email: 'max.mustermann@iits-consulting.de',
        username: 'BestMaxEuWest',
        elo: 69
      }
      const requestGetSpy = request.get as Mock<any, any>
      requestGetSpy.mockResolvedValueOnce(testResponse)

      const response = await sut.getPlayerByUsername('BestMaxEuWest')

      expect(requestGetSpy).toHaveBeenCalledOnce()
      expect(requestGetSpy).toHaveBeenCalledWith('testURL/players/BestMaxEuWest')
      expect(response).toStrictEqual(testResponse)
    })

    it('calls request.get and returns an error', async () => {
      const testError = new Error('testError')
      const requestGetSpy = request.get as Mock<any, any>
      requestGetSpy.mockRejectedValueOnce(testError)

      await expect(sut.getPlayerByUsername('BestMaxEuWest')).rejects.toThrowError(testError)

      expect(requestGetSpy).toHaveBeenCalledOnce()
      expect(requestGetSpy).toHaveBeenCalledWith('testURL/players/BestMaxEuWest')
    })
  })

  describe('updatePlayer', () => {
    it('calls request.put and returns a response', async () => {
      const testResponse: Player = {
        id: 'testId',
        displayName: 'Max Mustermann',
        email: 'max.mustermann@iits-consulting.de',
        username: 'BestMaxEuWest',
        elo: 69
      }
      const requestPutSpy = request.put as Mock<any, any>
      requestPutSpy.mockResolvedValueOnce(testResponse)

      const updatePlayer = {
        id: 'testId',
        displayName: 'Max Mustermann',
        email: 'max.mustermann@iits-consulting.de',
        username: 'BestMaxEuWest'
      }
      const response = await sut.updatePlayer(updatePlayer)

      expect(requestPutSpy).toHaveBeenCalledOnce()
      expect(requestPutSpy).toHaveBeenCalledWith('testURL/players/BestMaxEuWest', updatePlayer)
      expect(response).toStrictEqual(testResponse)
    })

    it('calls request.put and returns an error', async () => {
      const testError = new Error('testError')
      const requestPutSpy = request.put as Mock<any, any>
      requestPutSpy.mockRejectedValueOnce(testError)

      const updatePlayer = {
        displayName: 'Max Mustermann',
        email: 'max.mustermann@iits-consulting.de',
        username: 'BestMaxEuWest'
      }
      await expect(sut.updatePlayer(updatePlayer)).rejects.toThrowError(testError)

      expect(requestPutSpy).toHaveBeenCalledOnce()
      expect(requestPutSpy).toHaveBeenCalledWith('testURL/players/BestMaxEuWest', updatePlayer)
    })
  })

  describe('getElo', () => {
    it('calls request.get and returns a response', async () => {
      const testResponse: number = 1200
      const requestGetSpy = request.get as Mock<any, any>
      requestGetSpy.mockResolvedValueOnce(testResponse)

      const response = await sut.getElo('testusername')

      expect(requestGetSpy).toHaveBeenCalledOnce()
      expect(requestGetSpy).toHaveBeenCalledWith('testURL/players/testusername/elo')
      expect(response).toBe(1200)
    })

    it('calls request.get and returns an error', async () => {
      const testError = new Error('testError')
      const requestGetSpy = request.get as Mock<any, any>
      requestGetSpy.mockRejectedValueOnce(testError)

      await expect(sut.getElo('testusername')).rejects.toThrowError(testError)

      expect(requestGetSpy).toHaveBeenCalledOnce()
      expect(requestGetSpy).toHaveBeenCalledWith('testURL/players/testusername/elo')
    })
  })
})
