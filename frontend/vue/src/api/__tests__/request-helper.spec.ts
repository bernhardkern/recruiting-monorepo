import { describe, expect, it } from 'vitest'
import sut from '@/api/request-helper'

describe('request-helper.ts', () => {
  describe('getUrlSearchParams', () => {
    it('is called with empty params object and returns no URL search parameters', () => {
      expect(sut.getUrlSearchParams({}).toString()).toBe('')
    })

    it('is called with {foo: "bar"} params object and returns the URL search query "foo=bar"', () => {
      expect(sut.getUrlSearchParams({ foo: 'bar' }).toString()).toBe('foo=bar')
    })

    it('is called with {foo: "bar", buzz: "bam"} params object and returns the URL search query "foo=bar&buzz=bam"', () => {
      expect(sut.getUrlSearchParams({ foo: 'bar', buzz: 'bam' }).toString()).toBe(
        'foo=bar&buzz=bam'
      )
    })

    it('flattens lists to multiple parameters', () => {
      expect(sut.getUrlSearchParams({ foo: ['bar', 'baz'], buzz: ['bam', 'bin'] }).toString()).toBe(
        'foo=bar&foo=baz&buzz=bam&buzz=bin'
      )
    })

    it('discards undefined but retains null values', () => {
      expect(sut.getUrlSearchParams({ f0: 2, f1: null, f2: undefined, f3: '' }).toString()).toBe(
        'f0=2&f1=null&f3='
      )
    })
  })
})
