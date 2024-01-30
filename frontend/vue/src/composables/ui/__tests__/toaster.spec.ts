import { describe, expect, it, vi } from 'vitest'

import { useToaster as sut } from '@/composables/ui/toaster'

const toastAddMock = vi.fn()
vi.mock('primevue/usetoast', () => ({
  useToast: vi.fn(() => {
    return {
      add: toastAddMock
    }
  })
}))

describe('toaster.ts', () => {
  describe('useToaster()', () => {
    it(`provides a showError() function`, () => {
      const useToasterResult = sut()
      expect(typeof useToasterResult.showError).toBe('function')
    })

    it(`provides a showSuccess() function`, () => {
      const useToasterResult = sut()
      expect(typeof useToasterResult.showSuccess).toBe('function')
    })
  })
})
