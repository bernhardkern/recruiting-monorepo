import axios from 'axios'
import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'
import sut from '@/api/request'

vi.mock('axios')

interface DTO {
  id?: string
  value?: string
}
const noUrlSearchParams = new URLSearchParams()

describe('request.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('get', () => {
    it('calls axios.get and returns a response', async () => {
      const testDTO: DTO = { id: 'foo', value: 'bar' }
      const axiosGetSpy = axios.get as Mock<any, any>
      axiosGetSpy.mockResolvedValueOnce(testDTO)

      const response = await sut.get<DTO>('testURL')

      expect(axiosGetSpy).toHaveBeenCalledOnce()
      expect(axiosGetSpy).toHaveBeenCalledWith('testURL', {
        headers: {},
        params: noUrlSearchParams
      })
      expect(response).toStrictEqual(testDTO)
    })

    it('calls axios.get and returns an error', async () => {
      const testError = new Error('testError')
      const axiosGetSpy = axios.get as Mock<any, any>
      axiosGetSpy.mockRejectedValueOnce(testError)

      const response = await sut.get<DTO>('testURL')

      expect(axiosGetSpy).toHaveBeenCalledOnce()
      expect(axiosGetSpy).toHaveBeenCalledWith('testURL', {
        headers: {},
        params: noUrlSearchParams
      })
      expect(response).toStrictEqual(testError)
    })
  })

  describe('post', () => {
    it('calls axios.post and returns a response', async () => {
      const testDTO: DTO = { value: 'bar' }
      const testDTOResponse: DTO = { id: 'foo', value: 'bar' }
      const axiosPostSpy = axios.post as Mock<any, any>
      axiosPostSpy.mockResolvedValueOnce(testDTOResponse)

      const response = await sut.post<DTO>('testURL', testDTO)

      expect(axiosPostSpy).toHaveBeenCalledOnce()
      expect(axiosPostSpy).toHaveBeenCalledWith('testURL', testDTO, undefined)
      expect(response).toStrictEqual(testDTOResponse)
    })

    it('calls axios.post and returns an error', async () => {
      const testDTO: DTO = { value: 'bar' }
      const testError = new Error('testError')
      const axiosPostSpy = axios.post as Mock<any, any>
      axiosPostSpy.mockRejectedValueOnce(testError)

      const response = await sut.post<DTO>('testURL', testDTO)

      expect(axiosPostSpy).toHaveBeenCalledOnce()
      expect(axiosPostSpy).toHaveBeenCalledWith('testURL', testDTO, undefined)
      expect(response).toStrictEqual(testError)
    })
  })

  describe('put', () => {
    it('calls axios.put and returns a response', async () => {
      const testDTO: DTO = { id: 'buz', value: 'bar' }
      const testDTOResponse: DTO = { id: 'foo', value: 'bar' }
      const axiosPutSpy = axios.put as Mock<any, any>
      axiosPutSpy.mockResolvedValueOnce(testDTOResponse)

      const response = await sut.put<DTO>('testURL', testDTO)

      expect(axiosPutSpy).toHaveBeenCalledOnce()
      expect(axiosPutSpy).toHaveBeenCalledWith('testURL', testDTO, undefined)
      expect(response).toStrictEqual(testDTOResponse)
    })

    it('calls axios.put and returns an error', async () => {
      const testDTO: DTO = { id: 'buz', value: 'bar' }
      const testError = new Error('testError')
      const axiosPutSpy = axios.put as Mock<any, any>
      axiosPutSpy.mockRejectedValueOnce(testError)

      const response = await sut.put<DTO>('testURL', testDTO)

      expect(axiosPutSpy).toHaveBeenCalledOnce()
      expect(axiosPutSpy).toHaveBeenCalledWith('testURL', testDTO, undefined)
      expect(response).toStrictEqual(testError)
    })
  })
})
