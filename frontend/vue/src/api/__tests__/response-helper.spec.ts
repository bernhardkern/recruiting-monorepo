import { describe, expect, it } from 'vitest'
import { isDataResponseNotFailed, isResponseNotFailed, throwError } from '@/api/response-helper'
import type { Nullable } from '@/types/utility'

describe('response-helper.ts', () => {
  describe('isDataResponseNotFailed', () => {
    const sut = isDataResponseNotFailed

    it('returns false if it is called with an error object', () => {
      const testError = new Error('testError')
      expect(sut(testError)).toBeFalsy()
    })

    it(`returns false if it is called with no error object but the argument has no 'data' property`, () => {
      const testObject = { foo: 'bar' }
      expect(sut(testObject)).toBeFalsy()
    })

    it(`returns true if it is called with no error object and the argument has a 'data' property`, () => {
      const testObject = { data: 'bar' }
      expect(sut(testObject)).toBeTruthy()
    })
  })

  describe('isResponseNotFailed', () => {
    const sut = isResponseNotFailed

    it('returns false if it is called with an error object', () => {
      const testError = new Error('testError')
      expect(sut(testError)).toBeFalsy()
    })

    it('returns true if it is called with no error object', () => {
      const testObject = { foo: 'bar' }
      expect(sut(testObject)).toBeTruthy()
    })
  })

  describe('throwError', () => {
    const sut = throwError

    it('is called with an error object and throws that error', () => {
      const testError = new Error('testError')
      let caughtError: Nullable<any> = null
      try {
        sut(testError)
      } catch (error: any) {
        caughtError = error
      }
      expect(caughtError).toStrictEqual(testError)
    })

    it('returns false if it is called with no error object', () => {
      const testObject = { foo: 'bar' }
      expect(sut(testObject)).toBeFalsy()
    })
  })
})
